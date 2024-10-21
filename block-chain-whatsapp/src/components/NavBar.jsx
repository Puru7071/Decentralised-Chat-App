import React , {useEffect , useState , useContext} from 'react'
import { useNavigate } from "react-router-dom";
import Model from "./Model" ;
import Error from "./Error" ; 
import images from "../assets/index"


const NavBar = () => {
  const navigate = useNavigate() ; 
  return (
    <div>NavBar</div>
  )
}

export default NavBar