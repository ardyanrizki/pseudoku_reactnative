const initialState = {
  level: 'Easy'
}

export default function reducer (state = initialState, actions) {
  const { type, payload } = actions
  switch(type) {
    case 'LEVEL/SETLEVEL':
      return { ...state, level: payload}
    default:
      return state
  }
}