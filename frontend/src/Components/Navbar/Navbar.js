
import React, { useState } from "react";
import "./Navbar.css";

// import { ReactComponent as Icon } from "../../NoteSVG.svg";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  
  return (
    <>
      <nav className="main-nav">
        <div className="Icon">
        {/* <Icon style={{"height":"80","justifyContent":"start","alignItems": "center","width":"80"}} /> */}
        </div>
        {/* 1st logo part  */}
        <div className="logo">

          <h1>
          
            <span>A</span>gro
            <span></span>verse
          </h1>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
             "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/crop">Crop</NavLink>
            </li>
            <li>
              <NavLink to="/plot">Plot</NavLink>
            </li>
            <li>
              <NavLink to="/user">User</NavLink>
            </li>
            {/* <li> <NavLink to="/user">
                < BsPersonFill/>
                </NavLink>
            </li> */}
            
          </ul>
        </div>


        


        


      </nav> 
      <br /><br /><br /><br /><br />    
    </>
  );
};

export default Navbar;
