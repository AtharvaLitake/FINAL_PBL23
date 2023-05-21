import Donation from './components/donate/Donation'
import RegisterR from './components/login/register/RegisterR'
import RegisterD from './components/login/register/RegisterD'
import Profile from './components/login/Profile';
import LoginR from './components/login/LoginR'
import LoginD from './components/login/LoginD'
import NavBar from './components/navbar/Navbar';
import Home from './components/home/Home';
import About from './components/about/About';
import React from 'react';
import Receive from './components/receive/Receive'
import Success from './components/success/Success'
import { useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

function App() {
  const [userstate, setUserState] = useState({});
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/#" element={
          userstate && userstate._id ? (
            <Profile
              setUserState={setUserState}
              username={userstate.fname}
            />
          ) : (
            <LoginR setUserState={setUserState} />
          )
        }></Route>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/donate" element={<Donation/>}></Route>
        <Route exact path="/about" element={<About/>}></Route>
        <Route exact path="/receive" element={<Receive/>}></Route>
        <Route exact path="/success" element={<Success />}></Route>
        <Route exact path="/loginR" element={<LoginR/>}></Route>
        <Route exact path="/loginD" element={<LoginD/>}></Route>
        <Route exact path="/registerR" element={<RegisterR/>}></Route>
        <Route exact path="/registerD" element={<RegisterD/>}></Route>
        <Route exact path="/success" element={<Success/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
