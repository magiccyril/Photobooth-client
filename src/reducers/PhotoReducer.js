import {
  RESET,
  TIMER_START,
  PHOTO_REQUEST,
  PHOTO_REQUEST_RECEIVED,
  PHOTO_REQUEST_PROCESSING,
  PHOTO_REQUEST_ERROR,
  PHOTO_REQUEST_RESULT,
} from '../actions/actionsTypes'

const initialState = {
  error: false,
  pending: false,
  processing: false,
  path: null,
}

const PhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET:
      return {
        ...initialState,
      }
      
    case TIMER_START:
      return {
        ...state,
        ...initialState,
      }

    case PHOTO_REQUEST:
      return {
        ...state,
        pending: true,
      }
    
    case PHOTO_REQUEST_RECEIVED:
      return { ...state }
    
    case PHOTO_REQUEST_PROCESSING:
      return {
        ...state,
        processing: true,
      }
    
    case PHOTO_REQUEST_ERROR:
      return {
        ...state,
        error: true,
      }
      
    case PHOTO_REQUEST_RESULT:
      return {
        ...state,
        pending: false,
        processing: false,
        path: action.photo.path,
      }

    default:
      return state
  }
}

export default PhotoReducer