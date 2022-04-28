
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../../Components/Navbar/Navbar';
import './User.css';
import {BASE_API_URL} from '../../constant';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
const User = () => {

  const [isLoading, setLoading] = useState(true);
  const [user, setUser]=useState();
  useEffect(()=>{
    
    ( async()=>{
    //   const profile = await axios.get(`${BASE_API_URL}/profile`, 
    //   {withCredentials:true});
    //   setUser(profile.data[0]);
    //   setLoading(false);

    const profile = await axios.get(`${BASE_API_URL}/profile`, 
      {withCredentials:true});
      setUser(profile.data[0]);
      setLoading(false);
    })();

  }, []);


  if (isLoading) return "Loading...";
  else {
  return (
    <>
    <Navbar/>
      <div className="middle" >
        <div className="card">
          <h1 className="username"><li>&nbsp;&nbsp; {user.username}&nbsp;&nbsp;</li></h1>
          <p className="title" ><li>&nbsp;&nbsp;&nbsp; {user.email}&nbsp;&nbsp;&nbsp; </li></p>
          {/* <h2 className="yourtag">Note Count</h2>
          <div className="cent">
          <button className="buttonhome" >{user.notes.length}</button>
          </div> */}
          <p><button className="loginbutton" ><a style={{color:'white'}} href="http://localhost:5000/logout">Logout</a></button></p>
        </div>
      </div>
    </>
  );
  }
}
  
export default User;