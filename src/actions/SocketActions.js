import io from 'socket.io-client'

import {
  SOCKET_SETURI,
  SOCKET_TRYCONNECTION,
  SOCKET_CONNECTED,
  SOCKET_DISCONNECTED,
  SOCKET_EMIT,
  PHOTO_REQUEST_RECEIVED,
  PHOTO_REQUEST_PROCESSING,
  PHOTO_REQUEST_ERROR,
  PHOTO_REQUEST_RESULT,
} from './actionsTypes'

import {
  requestPhotoReceived,
  requestPhotoProcessing,
  requestPhotoError,
  requestPhotoResult,
} from '../actions/PhotoActions'

let socket = null

export const setSocketUri = (uri) => (dispatch) => {
  dispatch({
    type: SOCKET_SETURI,
    uri: uri
  });
}

export const socketConnect = () => (dispatch, getState) => {
  let uri = getState().socket.uri
  
  if (socket) {
    socket.disconnect()
  }
  
  socket = io.connect(uri, {
    reconnectionAttempts: 3
  });
  
  socket.on('connect', () => {
    dispatch({
      type: SOCKET_CONNECTED,
      socket: socket,
    })
  });
  
  socket.on('reconnect_failed', (error) => {
    dispatch({
      type: SOCKET_DISCONNECTED,
      error: error,
    })
  });
  
  socket.on(PHOTO_REQUEST_RECEIVED, () => {
    dispatch(requestPhotoReceived());
  });

  socket.on(PHOTO_REQUEST_PROCESSING, () => {
    dispatch(requestPhotoProcessing());
  });

  socket.on(PHOTO_REQUEST_ERROR, photo => {
    dispatch(requestPhotoError());
  });

  socket.on(PHOTO_REQUEST_RESULT, photo => {
    dispatch(requestPhotoResult(photo));
  });
  
  dispatch({
    type: SOCKET_TRYCONNECTION,
    uri: uri,
  })
}

export const socketEmit = (event, ...args) => (dispatch, getState) => {
  let socket = getState().socket.socket

  socket.emit(event, args)

  dispatch({
    type: SOCKET_EMIT,
    event: event,
    args: args,
  })
}
