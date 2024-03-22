import React from 'react'
import {Outlet } from "react-router-dom";
import Navbar from './Navbar';
const Layout = ({count}) => {
  return (
    <>
    <Outlet/>
    <Navbar count={count}/>
        
    </>
  )
}

export default Layout