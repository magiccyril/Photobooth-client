import {
  PHOTO_REQUEST,
  PHOTO_REQUEST_RECEIVED,
  PHOTO_REQUEST_PROCESSING,
  PHOTO_REQUEST_ERROR,
  PHOTO_REQUEST_RESULT,
} from './actionsTypes'
import { setReset } from './AppActions'
import { socketEmit } from './SocketActions'

export const requestPhoto = () => (dispatch) => {
  dispatch(socketEmit(PHOTO_REQUEST))
  dispatch({
    type: PHOTO_REQUEST,
  })
}

export const requestPhotoReceived = () => {
  return {
    type: PHOTO_REQUEST_RECEIVED,
  }
}

export const requestPhotoError = () => (dispatch) => {
  dispatch(setReset())
  dispatch({
    type: PHOTO_REQUEST_ERROR,
  })
}

export const requestPhotoProcessing = () => {
  return {
    type: PHOTO_REQUEST_PROCESSING,
  }
}

export const requestPhotoResult = (photo) => (dispatch) => {
  dispatch(setReset())
  dispatch({
    type: PHOTO_REQUEST_RESULT,
    photo: photo,
  })
}

