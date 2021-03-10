import AsyncStorage from '@react-native-async-storage/async-storage';

export function fetchGrid (level) {
  return async (dispatch) => {
    try {
      dispatch(setGridSolver(false))
      dispatch(setGridError(''))
      dispatch(setGridLoading(true))
      const response = await fetch('https://sugoku.herokuapp.com/board?difficulty=' + level)
      if(!response.ok) throw 'Fetching failed'
      const data = await response.json()
      const editable = data.board.map((y) => {
        return y.map((x) => {
          if(x > 0) {
            return false
          } else {
            return true
          }
        })
      })
      dispatch(setGrid(data.board))
      dispatch(setGridInit(data.board))
      dispatch(setGridEditable(editable))
      dispatch(setGridLoading(false))
    } catch (error) {
      dispatch(setGridError(error))
    }
  }
}

export function setGrid (payload) {
  return { type: 'GRID/SETGRID', payload }
}

export function setGridInit (payload) {
  return { type: 'GRID/SETGRIDINIT', payload }
}

export function setGridEditable (payload) {
  return { type: 'GRID/SETGRIDEDITABLE', payload }
}

export function setGridError (payload) {
  return { type: 'GRID/SETGRIDERROR', payload }
}

export function setGridLoading (payload) {
  return { type: 'GRID/SETGRIDLOADING', payload }
}

export function setGridSolver (payload) {
  return { type: 'GRID/SETGRIDSOLVER', payload }
}

export function setLevel (payload) {
  return { type: 'LEVEL/SETLEVEL', payload }
}

export function setScore (payload) {
  return { type: 'SCORE/SETSCORE', payload }
}

export function addLeaderBoard (payload) {
  return async (dispatch) => {
    try {
      let data = await AsyncStorage.getItem('storage_key')
      data = JSON.parse(data)
      if(!data) data = []
      data.push(payload)
      await AsyncStorage.setItem('storage_key', JSON.stringify(data))
      dispatch(getLeaderBoard())
    } catch (error) {
      console.log(error)
    }
  }
}

export function getLeaderBoard () {
  return async (dispatch) => {
    try {
      let data = await AsyncStorage.getItem('storage_key')
      data = JSON.parse(data).sort((a, b) => b.score - a.score)
      if(data.length > 3) {
        const newArr = []
        for (let i = 0; i < 3; i++) {
          newArr.push(data[i])
        }
        dispatch(setLeaderBoard(newArr))
      } else {
        dispatch(setLeaderBoard(data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export function setLeaderBoard (payload) {
  return { type: 'LEADERBOARD/SETLEADERBOARD', payload}
}