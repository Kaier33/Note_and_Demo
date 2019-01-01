
import { CHANGE_LOGINSTATUS } from '../constants/counter'

const MAIN_STATE = {
  temp: 233,
  login_status: false
}

export default function counter(state = MAIN_STATE, action) {
  switch (action.type) {
    case CHANGE_LOGINSTATUS:
      return {
        ...state,
        login_status: !state.login_status
      }
    default:
      return state
  }
}
