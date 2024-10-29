import {applyMiddleware, createStore} from "redux";
import combineReducer from "./reducers"
import { thunk } from "redux-thunk";



const store = createStore(combineReducer, applyMiddleware(thunk))

export default store;