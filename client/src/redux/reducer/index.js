import { combineReducers } from "redux";
import UserReducer from "./userreducer.js";
import Props from './props.js';

export default combineReducers({
  user: UserReducer,
  props:Props
});
