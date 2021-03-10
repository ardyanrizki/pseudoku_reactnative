import React, { useEffect } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput
} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux'
import { getLeaderBoard } from '../store/actions'
import Header from '../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Leaderboard ({ route, navigation }) {
  const dispatch = useDispatch()
  const leaderBoard = useSelector(state => state.leaderboard.array)
  const username = route.params.name
  const score = route.params.score

  // useEffect(() => {
  //   dispatch(getLeaderBoard())
  // }, [])

  console.log(leaderBoard, 'leaderboard')

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.header}>
        <Text style={styles.headerText}>Leaderboard</Text>
      </View>
      <View style={styles.cardContainer}>
        { leaderBoard.length >= 3 ?
          leaderBoard.map((user, i) =>
            (
              <View style={styles.cardLeaderboard}>
                <View style={{flex: 1, marginRight: 30}} textAlign='center'>
                  <Text style={styles.text}>{i + 1}.</Text>
                </View>
                <View style={{flex: 7, textAlign: 'left'}}>
                  <Text style={styles.text}>{user.username}</Text>
                </View>
                <View style={{flex: 2}} textAlign='center'>
                  <Text style={styles.text}>{user.score}</Text>
                </View>
              </View>
            )
          ) :
          <Text style={styles.text}>Empty leaderboard</Text>
        }
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.primaryTextBold}>YOUR SCORE</Text>
        <View style={styles.cardScore}>
          <View style={{flex: 7, textAlign: 'left'}}>
            <Text style={styles.primaryText}>{username}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.primaryText}>{score}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.push("Signup")} style={styles.btnPrimary}>
        <Text style={styles.bigText}>Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center'
  },
  primaryTextBold: {
    color: '#f89800',
    fontSize: 20,
    fontWeight: 'bold',
  },
  primaryText: {
    color: '#f89800',
    fontSize: 20,
    fontWeight: '400',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
  },
  input: {
    width: '100%',
    margin: 8,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 9,
    paddingVertical: 11,
    textAlign: 'left',
    fontSize: 16,
    color: '#fff'
  },
  cardContainer: {
    width: '100%',
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  cardLeaderboard: {
    width: '100%',
    padding: 14,
    margin: 2,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  cardScore: {
    width: '100%',
    padding: 14,
    marginTop: 20,
    backgroundColor: '#1E1E1E',
    borderWidth: 2,
    borderColor: '#f89800',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
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
