import axios from "axios";
import { useEffect, useState } from "react";
import TableS1 from "./TableS1";
import TableS2 from "./TableS2";
import TableS3 from "./TableS3";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

import TextField from "@mui/material/TextField";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import "./todo.css"
import Autocomplete from "@mui/material/Autocomplete";
import { minWidth } from "@mui/system";

import { BASE_API_URL } from "../../constant";
import Navbar from '../../Components/Navbar/Navbar';
import Plotcard from "../../Components/Plotcard/Plotcard";

export default function Todo() {
  const [skipDBCall, setSkipDBCall] = useState(false);
  const [data, setData] = useState();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {  
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const theme = useTheme();

  useEffect(() => {
    if (!skipDBCall) {
      console.log("DB CALL");

      ( async()=>{
          const Plots = await axios.get(`${BASE_API_URL}/getTodoS1`,{
              withCredentials:true,
          });
          console.log(Plots);
          const nd = await Plots.data;
          console.log(nd);
          setSkipDBCall(true);
          setData(nd);
      })();
    }
  });

  function getStyles(tag, tags, theme) {
    return {
      fontWeight:
        tags.indexOf(tag) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

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
          setData(value);
        }}
        plots={data}
      />

      <br />
      <br />    
      <br />
      <br />
      <br />
      
<h1 style={{marginLeft:"13%"}} className="hnote">S2 :-</h1>

      <TableS2
        onChange={(value) => {
          setData(value);
        }}
        plots={data}
      />

<br />
      <br />    
      <br />
      <br />
      <br />

<h1 style={{marginLeft:"13%"}} className="hnote">S3 :-</h1>
      <TableS3
        onChange={(value) => {
          setData(value);
        }}
        plots={data}
      />
    </div>
    </>
  );
}
