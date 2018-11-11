import { combineReducers } from 'redux'
import counter from './counter'
import temp from './temp'

export default combineReducers({
  counter,
  temp
})
