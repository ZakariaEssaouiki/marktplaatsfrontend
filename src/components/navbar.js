import React from 'react';
import {  Link } from "react-router-dom";
import "./navbar.css";

const navbar= () =>{
  return (
		<header className="header">
		<div className="left">
			<a href="#">Marktplaats</a>
		</div>
  <div className="mid">
		<ul className="navbar">
			 <li>
      <Link to="/product">Product</Link>
    </li>
    <li>
      <Link to="/gebruiker">Gebruiker</Link>
    </li>
		</ul>
   
  </div>
	<div className="right">
          <a href="#">Logout</a>
        </div>

    </header>
  );
}
export default navbar;