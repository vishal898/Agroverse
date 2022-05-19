import axios from "axios";
import { useEffect, useState } from "react";
import TableS1 from "./TableS1";
import TableS2 from "./TableS2";
import TableS3 from "./TableS3";
import * as React from "react";
import { BASE_API_URL } from "../../constant";
import Navbar from '../../Components/Navbar/Navbar';


export default function Todo() {
  const [skipDBCall, setSkipDBCall] = useState(false);
  const [dataS1, setDataS1] = useState();
  const [dataS2, setDataS2] = useState();
  const [dataS3, setDataS3] = useState();

  useEffect(() => {
    if (!skipDBCall) {
      console.log("DB CALL");

      ( async()=>{
          const S1 = await axios.get(`${BASE_API_URL}/getTodoS1`,{
              withCredentials:true,
          });
          const s1 = await S1.dataS1; 
          console.log(s1);
          setSkipDBCall(true);
          setDataS1(s1);

      //     const S2 = await axios.get(`${BASE_API_URL}/getTodoS2`,{
      //       withCredentials:true,
      //   });
      //   const s2 = await S2.dataS2;
      //     console.log(s2);
      //     setSkipDBCall(true);
      //     setDataS2(s2);

      //   const S3 = await axios.get(`${BASE_API_URL}/getTodoS3`,{
      //     withCredentials:true,
      // });
      // const s3 = await S3.dataS3;
          
      //     console.log(s3);
      //     setSkipDBCall(true);
      //     setDataS3(s3);
          
      })();
    }
  });



  return (
    <>
    <Navbar/>
    
    <div >
      <h1 align="center" className="hnote">
        To-do's 
      </h1>
     
      <br />
      <br />
      <br />
      <br />
      <br />
      
<h1 style={{marginLeft:"13%"}}className="hnote">S1 :-</h1>
      <TableS1
        onChange={(value) => {
          setDataS1(value);
        }}
        S1={dataS1}
      />

      <br />
      <br />    
      <br />
      <br />
      <br />
      
<h1 style={{marginLeft:"13%"}} className="hnote">S2 :-</h1>

      <TableS2
        onChange={(value) => {
          setDataS2(value);
        }}
        S2={dataS2}
      />

<br />
      <br />    
      <br />
      <br />
      <br />

<h1 style={{marginLeft:"13%"}} className="hnote">S3 :-</h1>
      <TableS3
        onChange={(value) => {
          setDataS3(value);
        }}
        S3={dataS3}
      />
    </div>
    </>
  );
}
