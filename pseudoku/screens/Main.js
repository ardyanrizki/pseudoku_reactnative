import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGrid, setGrid, setGridSolver, setScore, addLeaderBoard } from '../store/actions'
import Header from '../components/Header'
import Row from '../components/Row'
import logo from '../assets/pseudoku.png'

export default function Main ({route, navigation}) {
  const dispatch = useDispatch()

  const grid = useSelector(state => state.grid.array)
  const initGrid = useSelector(state => state.grid.init)
  const loading = useSelector(state => state.grid.loading)
  const error = useSelector(state => state.grid.error)
  const level = useSelector(state => state.level.level)
  const score = useSelector(state => state.score.point)

  const username = route.params.name

  const [countdown, setCountdown] = useState('')
  const [intervals, setIntervals] = useState('')

  if(error) {
    alert(error)
    navigation.push('Signup')
  }

  useEffect(() => {
    dispatch(fetchGrid(level.toLowerCase()))
    startCountdown(600)
  }, [dispatch])

  function startCountdown (seconds) {
    setCountdown('')
    let intervals = setInterval(() => {
      let sec = seconds % 60
      let min = Math.floor(seconds / 60)
      let displaySec, displayMin
      if (sec < 10) displaySec = `0${sec}`
      else displaySec = `${sec}`
      if (min < 10) displayMin = `0${min}`
      else displayMin = `${min}`
      let currNumber = `${displayMin} : ${displaySec}`
      setCountdown(currNumber)
      seconds--
      dispatch(setScore(+seconds))
      if (seconds === 0) clearInterval(intervals)
    }, 1000)
    setIntervals(intervals)
  }

  const inputChange = (num, col, row) => {
    const mapped =  grid.map((y, yIndex) => {
      return y.map((x, xIndex) => {
        if(xIndex === col & yIndex === row) {
          return x = +num
        } else {
          return x
        }
      })
    })
    dispatch(setGrid(mapped))
  }

  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

  const solver = () => {
    const data = { board: initGrid }
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(data => {
        const newGrid = JSON.parse(JSON.stringify(data.solution))
        dispatch(setGrid(newGrid))
        dispatch(setGridSolver(true))
      })
      .catch(err => {
        alert(err)
      })
  }

  const validator = () => {
    const data = { board: grid }
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(data => {
        switch(data.status) {
          case 'solved':
            alert("Great! It's works")
            clearInterval(intervals)
            const user = { username, score }
            dispatch(addLeaderBoard(user))
            navigation.navigate('Leaderboard', {name: username, score: score})
            break
          case 'broken':
            alert("You have to fix some number")
            break
          case 'unsolved':
            alert("There's empty number?")
            break
          default:
            alert("It's not working")
        }
      })
      .catch(err => {
        alert(err)
      })
  }

  if(countdown === '00 : 00') {
    alert("Time's up")
    navigation.navigate('Leaderboard', {name: username, score: 0})
    dispatch(setCountdown(''))
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : null}
    style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {
          !loading ?
          <>
            <Header />
            <View style={styles.header}>
              <Text style={styles.headerText}>{level} level</Text>
              <Text style={{fontSize: 18, color: '#fff'}}>{username}, prove you are not the poser</Text>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: '#f89800', marginTop: 20}}>{countdown}</Text>
            </View>
            {grid.map((row, index) => (
              <Row style={{marginBottom: 50}} key={index} init={loading} index={index} row={row} inputChange={inputChange} />
            ))}
            <View style={{marginTop: 70, width: '100%'}}>
              <TouchableOpacity onPress={solver} style={styles.btnSecondary}>
                <Text style={styles.bigTextWhite}>Give up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={validator} style={styles.btnPrimary}>
                <Text style={styles.bigText}>Validate</Text>
              </TouchableOpacity>
            </View>
            </> :
            <>
              <Image
              source={logo}
              style={styles.image}
              />
              <ActivityIndicator size="small" color="#fff" />
            </>
        }
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    paddingTop: 100,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 250,
    height: 160,
    resizeMode: 'contain',
    marginBottom: 20
  },
  header: {
    marginTop: 20,
    marginBottom: 50,
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  btnPrimary: {
    width: '100%',
    margin: 8,
    backgroundColor: '#f89800',
    padding: 15,
    alignItems: 'center'
  },
  btnSecondary: {
    width: '100%',
    margin: 8,
    backgroundColor: '#1E1E1E',
    padding: 15,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#fff'
  },
  bigText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#161616'
  },
  bigTextWhite: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff'
  }
});
