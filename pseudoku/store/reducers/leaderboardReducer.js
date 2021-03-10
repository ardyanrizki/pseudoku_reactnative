const initialState = {
  array: []
}

export default function reducer (state = initialState, actions) {
  const { type, payload } = actions
  switch(type) {
    case 'LEADERBOARD/SETLEADERBOARD':
      return { ...state, array: payload}
    default:
      return state
  }
}