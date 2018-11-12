import {
  ADD,
  MINUS,
  BANNERS,
  FIRSTUP
} from '../constants/counter'

const INITIAL_STATE = {
  num: 0,
  bannerList: [],
  firstUp: true,
}

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
    case MINUS:
      return {
        ...state,
        num: state.num - 1
      }
    case FIRSTUP:
      return {
        ...state,
        firstUp: false
      }
    case BANNERS:
      return {
        ...state,
        bannerList: action.data
      }
    default:
      return state
  }
}
