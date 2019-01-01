import { combineReducers } from 'redux'
import counter from './counter'
import main from './main'

export default combineReducers({
  counter,
  main
})
