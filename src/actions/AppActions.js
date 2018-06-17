import {
  RESET,
  RESET_CLEAR,
  RESET_SET,
} from './actionsTypes'

let resetTimeout = null

export const setReset = () => (dispatch) => {
  resetTimeout = setTimeout(() => dispatch(reset()), 120000)
  dispatch({
    type: RESET_SET,
  })
}

export const reset = () => {
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
