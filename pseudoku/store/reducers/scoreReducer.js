const initialState = {
  point: 0
}

export default function reducer (state = initialState, actions) {
  const { type, payload } = actions
  switch(type) {
    case 'SCORE/SETSCORE':
      return { ...state, point: payload}
    default:
      return state
  }
}