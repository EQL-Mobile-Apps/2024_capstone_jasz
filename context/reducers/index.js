import { combineReducers } from "redux";
import { Provider } from 'react-redux';

import { jsonReducer } from "./jsonReducer";
import { locationReducer } from "./locationReducer";
import userReducer from './userReducer';

const combineReducer = combineReducers({
    jsonReducer,
    locationReducer, 
    userReducer

})

export default combineReducer