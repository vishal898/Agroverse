
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../../Components/Navbar/Navbar';
import './S2.css';
import {BASE_API_URL} from '../../constant';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
const User = () => {

  const [isLoading, setLoading] = useState(true);
 
//   useEffect(()=>{
    
//     ( async()=>{
    

//     const profile = await axios.get(`${BASE_API_URL}/profile`, 
//       {withCredentials:true});
//       setUser(profile.data[0]);
//       setLoading(false);
//     })();

//   }, []);


//   if (isLoading) return "Loading...";
//   else {
  return (
    <>
    <Navbar/>
      
    </>
  );
  
}
  
export default User;