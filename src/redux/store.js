import {createStore, combineReducers} from 'redux'
import reducer from './reducer'

const rootReducer = combineReducers({
    reducer
})

export default createStore(rootReducer);