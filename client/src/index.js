import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import reducers from "./redux/reducer";
import thunk from "redux-thunk";
const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'));
const data ={
  index:0
}
const datas = JSON.parse(localStorage.getItem("sidebar"));
if(!datas){
  localStorage.setItem("sidebar",JSON.stringify(data));
}
root.render(
  <BrowserRouter>
    <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
