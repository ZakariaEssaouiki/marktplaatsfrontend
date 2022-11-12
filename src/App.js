import React from 'react';
import './App.css';
import {Route,Routes,BrowserRouter as Router} from "react-router-dom";
import Product from './components/Product.js';
import Gebruiker from "./components/Gebruiker.js";
import Navbar from "./components/navbar.js"

function App() {
    return (
        <Router>
         <Navbar/>
         <Routes>
            <Route path="/gebruiker" element={<Gebruiker/>} />
            <Route path="/product" element={<Product/>}/>
         </Routes>
        </Router>
    );
}

export default App;