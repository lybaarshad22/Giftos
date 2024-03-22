import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from './../../images/logo.png'




const Navbar = ({count}) => {

  const handleLogOut = ()=>{
    let result = fetch('http://localhost:4000/user/auth/logout')
    .then(response=>{
      return response.json();
    });
  }
  return (
    <>
      <section>
        <div className="nav-wrapper theme-container">
          <div className="nav-container">
          <h1 className="logo-head">Flare</h1>
          <div className="nav-menu">
            <div className="logo">
              <img src={logo} width={70} height={70}/>
            </div>
            <div className="menu-container">
            <div className="menu-options left-option">
            <ul>
              <li><Link to="/home">Home</Link> </li>
              <li><Link to="/allproduct">All Products</Link> </li>
              <li><Link to="/watches">Watches</Link> </li>
              <li><Link to="/perfumes">Perfumes</Link> </li>
            </ul>
            </div>

            <div className="menu-options">
            <ul>
              <li><Link to="/login" onClick={handleLogOut}>  <FontAwesomeIcon icon={faUser} /> Log Out</Link> </li>
              <li><Link> <FontAwesomeIcon icon={faSearch} /> Search</Link> </li>
              <li className="badge-position"><Link to="/shop" > <FontAwesomeIcon icon={faShoppingBag}/> Cart</Link> <span className="cart-badge">{count}</span> </li>
              {/* <li><Link to="/contact"> <FontAwesomeIcon icon={faContact} /> Contact</Link> </li> */}
            
            </ul>
                  
            </div>
          </div>
          </div>
          </div>
          </div>
          
      </section>
    </>
  );
};

export default Navbar;
