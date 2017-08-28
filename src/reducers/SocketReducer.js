import {
  SOCKET_SETURI,
  SOCKET_CONNECTED,
  SOCKET_DISCONNECTED,
  SOCKET_TRYCONNECTION,
} from '../actions/actionsTypes'

const initialState = {
  connected: false,
  socket: null,
  uri: '',
}

const SocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_TRYCONNECTION:
      return {
        ...state,
        connected: false,
      }

    case SOCKET_CONNECTED:
      return {
        ...state,
        connected: true,
        socket: action.socket,
      }

    case SOCKET_DISCONNECTED:
      return {
        ...state,
        connected: false,
        socket: null,
      }

    case SOCKET_SETURI:
      return {
        ...state,
        uri: action.uri,
      }

    default:
      return state
  }
}

export default SocketReducer