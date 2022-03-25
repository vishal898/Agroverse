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
import "./Crop.css"
import Autocomplete from "@mui/material/Autocomplete";
import { minWidth } from "@mui/system";

import { BASE_API_URL } from "../../constant";
import Navbar from '../../Components/Navbar/Navbar';
import Cropcard from "../../Components/Cropcard/Cropcard";

export default function Crop() {
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
          const crops = await axios.get(`${BASE_API_URL}/getAllCrops`,{
              withCredentials:true,
          });
          const nd = await crops.data;
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
        My crops  <Cropcard />
      </h1>
     
      <br />
      <br />
      <br />
      <br />
      <br />
      <Table
        onChange={(value) => {
          setData(value);
        }}
        crops={data}
      />

      <br />
      <br />    
      <br />
      <br />
      <br />
    </div>
    </>
  );
}

// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import * as React from 'react';
// import Grid from '@mui/material/Grid';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import InputLabel from '@mui/material/InputLabel';

// const defaultValues = {
//     name: "",
//     parcels: null,
//     areaofparcel: null,
// };

// export default function Crop() {

//     const [formValues, setFormValues] = useState(defaultValues);

//     const handleNameChange = (e) => {
//         const { name, value } = e.target;
//         console.log(name+ " "+ value);
//         setFormValues({
//           ...formValues,
//           [name]: value,
//         });
//     };

//     const handleParcelsChange = (e) => {
//         const { name, value } = e.target;
//         console.log(name+ " "+ value);
//         setFormValues({
//           ...formValues,
//           [name]: value,
//         });
//     };

//     const handleAreaChange = (e) => {
//         const { name, value } = e.target;
//         console.log(name+ " "+ value);
//         setFormValues({
//           ...formValues,
//           [name]: value,
//         });
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log(formValues);
//         // idhar axios call ayega database mai update karne keleye
//         // ( async()=>{
//         //     const plot = await axios.get('http://localhost:5000/createplot',{
//         //         withCredentials:true,
//         //     });
//         // })();

//         // after adding new plot details
//         // set the formvalues default again -- basically refresh form

//         // so as we are doing axios call here i don't think we need use effect now .
//     };

//     // useEffect(()=>{
//     // },[]);

//     return (
//         <div  >
//             <div className='plot-form'>
//            <form onSubmit={handleSubmit}>
//                 <Grid container alignItems="center" justify="center" direction="column">
//                     <Grid item>
//                     <InputLabel shrink htmlFor="name-input"> Name Of The Plot </InputLabel>
//                         <TextField
//                             id="name-input"
//                             name="name"
//                             label="Name"
//                             type="text"
//                             value={formValues.name}
//                             onChange={handleNameChange}
//                         />
//                     </Grid>
//                     <br/>
//                     <Grid item>
//                     <InputLabel shrink htmlFor="noofparcels-input"> Number Of Parcels </InputLabel>
//                         <TextField
//                             id="noofparcel-input"
//                             name="parcels"
//                             label="No of Parcels"
//                             type="number"
//                             value={formValues.parcels}
//                             onChange={handleParcelsChange}
//                         />
//                     </Grid>
//                     <br/>
//                     <Grid item>
//                     <InputLabel shrink htmlFor="area-input"> Area Of the Plots </InputLabel>
//                         <TextField
//                             id="area-input"
//                             name="areaofparcel"
//                             label="Area of Parcel"
//                             type="number"
//                             value={formValues.areaofparcel}
//                             onChange={handleAreaChange}
//                         />
//                     </Grid>
//                     <br />
//                     <Button variant="contained" color="primary" type="submit">
//                         Submit
//                     </Button>
//                 </Grid>
//             </form>
//             </div>
//         </div>
//     )
// }
