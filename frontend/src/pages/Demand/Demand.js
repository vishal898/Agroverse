import * as React from "react";
import Navbar from '../../Components/Navbar/Navbar';
import Demandform from "../../pages/Demand/Form"; 

export default function Demand() {
 

  

  return (
    <>
    <Navbar/>
    
    <div >
    <h1 align="center" style={{color:"black",marginBottom:"5%",marginTop:"-4%"}}>
        Add demand  
                  
      </h1>
    
      <Demandform/>
      
    </div>
    </>
  );
}
