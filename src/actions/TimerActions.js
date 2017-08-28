import {
  TIMER_START,
  TIMER_TICK,
  TIMER_END,
  TIMER_SET_LENGTH,
} from './actionsTypes'
import { clearReset } from './AppActions'

let timer = null

export const startTimer = (endAction) => (dispatch) => {
  dispatch(clearReset())
  clearInterval(timer)
  dispatch({
    type: TIMER_START,
  });
  timer = setInterval(() => dispatch(tickOrStop(endAction)), 1000);
}

const tickOrStop = (endAction) => (dispatch, getState) => {
  if (getState().timer.count <= 0) {
    dispatch(stopTimer(endAction))
  }
  else {
    dispatch(tick())
  }
}

const tick = () => {
  return {
    type: TIMER_TICK,
  }
}

export const stopTimer = (endAction) => (dispatch) => {
  clearInterval(timer)
  dispatch({ type: TIMER_END })
  if (endAction) {
    dispatch(endAction())
  }
}

export const setTimerLength = (value) => {
  return {
    type: TIMER_SET_LENGTH,
    value: value,
  }
} 
