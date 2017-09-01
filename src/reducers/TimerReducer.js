import {
  RESET,
  TIMER_START,
  TIMER_TICK,
  TIMER_END,
  TIMER_SET_LENGTH,
} from '../actions/actionsTypes'

const initialState = {
  count: 5,
  length: 5,
  running: false,
}

const TimerReducer = (state = initialState, action) => {
  switch (action.type) {

    case RESET:
      let currentLength = state.length
      return {
        ...initialState,
        length: currentLength,
        running: false,
      }

    case TIMER_START:
      return {
        ...state,
        count: state.length ? state.length : initialState.count,
        running: true,
      }

    case TIMER_TICK:
      return { ...state, count: state.count - 1 }

    case TIMER_END:
      return {
        ...state,
        running: false,
      }

    case TIMER_SET_LENGTH:
      let value = parseInt(action.value, 10);
      return {
        ...state,
        count: value,
        length: value,
      }

    default:
      return state
  }
}

export default TimerReducer