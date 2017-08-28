import {
  RESET,
  RESET_CLEAR,
  RESET_SET,
} from './actionsTypes'

let resetTimeout = null

export const setReset = () => (dispatch) => {
  resetTimeout = setTimeout(() => dispatch(reset()), 60000)
  dispatch({
    type: RESET_SET,
  })
}

const reset = () => {
  return {
    type: RESET,
  }
}

export const clearReset = () => (dispatch) => {
  clearTimeout(resetTimeout)
  dispatch({
    type: RESET_CLEAR,
  })
}
