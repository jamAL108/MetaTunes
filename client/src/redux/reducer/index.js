import { combineReducers } from "redux";
import UserReducer from "./userreducer.js";
import Props from './props.js';
import Playerreducer from './playerreducer.js';

export default combineReducers({
  user: UserReducer,
  props:Props,
  player:Playerreducer
});
