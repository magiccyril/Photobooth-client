import { combineReducers }  from 'redux'

import socketReducer from './SocketReducer'
import timerReducer from './TimerReducer'
import photoReducer from './PhotoReducer'

const Reducers = combineReducers({
  socket: socketReducer,
  timer: timerReducer,
  photo: photoReducer,
})

export default Reducers
