
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import ReactDOM from "react-dom/client";
import Popper from 'popper.js';
import React from 'react';
import './index.css';
import Home from './components/Home';

import Login from './components/Login';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/login' element={< Login />}></Route>
      </Routes>
  </Router>,
  </React.StrictMode>
  </React.StrictMode>
);
 
// If you want to start measuring performance
// in your app, pass a function to log results
// (for example: reportWebVitals(console.log))
// or send to an analytics endpoint.
reportWebVitals();
