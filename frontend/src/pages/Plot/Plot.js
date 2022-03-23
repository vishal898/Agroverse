import axios from "axios";
import { useEffect, useState } from "react";
import Table from "./Table";

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
// import "./Demo.css"
import Autocomplete from "@mui/material/Autocomplete";
import { minWidth } from "@mui/system";

import { BASE_API_URL } from "../../constant";

export default function Crop() {
  const [skipDBCall, setSkipDBCall] = useState(false);
  const [data, setData] = useState();
  const [tableData, setTableData] = useState();
  const [diff, setDiff] = useState("All");

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

//   useEffect(() => {
//     if (!skipDBCall) {
//       console.log("DB CALL");

//       ( async()=>{
//           const notes = await axios.get(`${BASE_API_URL}/getAllNotes`,{
//               withCredentials:true,
//           });
//           const nd = await notes.data;
//           setSkipDBCall(true);
//           setData(nd);
//           setTableData(nd);
//           const tt = [];
//           nd.forEach((n)=>{
//               tt.push(n.title);
//           });
//           setAvailTitles(tt);
//       })();

//       ( async()=>{
//           const ts = await axios.get(`${BASE_API_URL}/getTags`,{
//               withCredentials:true,
//           });
//           const ut = await ts.data;
//           setAvailTags(ut);
//       })();
//     }
//     // else{
//     //     setSkipDBCall(true);
//     //     setData(null);
//     //     setTableData(null);
//     //     setAvailTitles(null);
//     //     setAvailTags(null);

//     // }
//     //    setTableData(filterData(data,filter));
//   }, [filter]);

  function getStyles(tag, tags, theme) {
    return {
      fontWeight:
        tags.indexOf(tag) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <div style={{ width: "1000px" }}>
      <p align="center" className="hnote">
        My Notes
      </p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Table
        onChange={(value) => {
        //   setTableData(value);
        //   setData(value);
          const tt = [];
          value.forEach((n) => {
            tt.push(n.title);
          });
        //   setAvailTitles(tt);
        }}
        notes={tableData}
      />

      <br />
      <br />    
      <br />
      <br />
      <br />
    </div>
  );
}
