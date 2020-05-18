import { combineReducers } from 'redux'

import schedule from './schedule-reducer'

const reducer = combineReducers({
  schedule,
})

export default reducer
