const initialState = {
  array : [],
  init : [],
  editable : [],
  loading: true,
  error: '',
  solver: false
}

export default function reducer (state = initialState, actions) {
  const { type, payload } = actions
  switch(type) {
    case 'GRID/SETGRID':
      return { ...state, array: payload }
    case 'GRID/SETGRIDINIT':
      return { ...state, init: payload }
    case 'GRID/SETGRIDEDITABLE':
      return { ...state, editable: payload }
    case 'GRID/SETGRIDERROR':
      return { ...state, error: payload }
    case 'GRID/SETGRIDLOADING':
      return { ...state, loading: payload }
    case 'GRID/SETGRIDSOLVER':
      return { ...state, solver: payload }
    default:
      return state
  }
}