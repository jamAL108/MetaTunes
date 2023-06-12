import { combineReducers } from "redux";
import UserReducer from "./userreducer";
import Props from './props.js';

export default combineReducers({
  user: UserReducer,
  props:Props
});
