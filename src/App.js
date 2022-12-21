import React from 'react';
import './App.css';
import {Route,Routes,BrowserRouter as Router} from "react-router-dom";
import Product from './components/Product.js';
import Home from './Home.js';
import Profile from './Profile.js';
import Profiel from "./components/Profiel.js";
import Navbar from "./components/Navbar.js";
import ChatRoom from './components/ChatRoom.js';
import Advertenties from './components/Advertenties';
//import { GlobalProvider } from './Login.js';

const App = () => {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/chat" element={<ChatRoom/>}/>
                <Route path="/profile" exact={true} element={<Profile/>}/>
                <Route path="/producten" element={<Product/>}/>
                <Route path="/profiel" element={<Profiel/>}/>
                <Route path="/advertenties" element={<Advertenties/>} />
            </Routes>
        </Router>
    )
}

export default App;