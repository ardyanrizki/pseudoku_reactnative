import {createStore, combineReducers, applyMiddleware} from 'redux'
import Thunk from 'redux-thunk'
import gridReducer from './reducers/gridReducer'
import levelReducer from './reducers/levelReducer'
import scoreReducer from './reducers/scoreReducer'
import leaderboardReducer from './reducers/leaderboardReducer'

const rootReducer = combineReducers({
  grid: gridReducer,
  level: levelReducer,
  score: scoreReducer,
  leaderboard: leaderboardReducer
})

const store = createStore(rootReducer, applyMiddleware(Thunk))

export default store