import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {InputLabel} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { BASE_API_URL } from "../../constant";
import { useLocation, useNavigate, Link } from 'react-router-dom';

import Table from "./Table";

import './S2.css';
const defaultValues = {
    plotId:"",
    q:null
};

export default function Form() {
    const location = useLocation();
    const cropId = location.state.cropId;
    console.log(location.state.cropId);
    const [formValues, setFormValues] = useState(defaultValues);
    const [plots, setPlots] = useState([]);
    const [boolVal, setBoolVal] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name+ " "+ value);
        setFormValues({
          ...formValues,
          [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("handleSumbitClicked");
        console.log(formValues);
        console.log(cropId);
        ( async()=>{
            const permutations = await axios.get(`${BASE_API_URL}/getPermutation/${formValues.plotId}/${cropId}/${formValues.q}`,formValues,{
              withCredentials:true,
            });
            console.log(permutations.data);
            setData(permutations.data);
            // alert("Demand Added Successfully");
        })();
    };

    const fetchAllCrops = async () => {
        try {
            setLoading(true);
            let condition = {active: true}
            const cs = await axios.get(`${BASE_API_URL}/getAllPlots`,{withCredentials:true});
            console.log(cs.data);
            plots?.map((plot) => {
                console.log(plot);
            });
            setPlots(cs.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };


    useEffect(() => {
        if (!boolVal) {
            fetchAllCrops();
            setBoolVal(true);
        }
    }, [boolVal]);

    if (isLoading) return "Loading...";
    else {
    return (
        <>
      <Navbar/>
           
           <form onSubmit={handleSubmit}  className=' S2'>
                <Grid className="grid" container alignItems="center" justify="center" direction="column">
                    <Grid item className="inp">
                    <InputLabel shrink htmlFor="plotname-input"style = {{color:"white" , paddingTop:"10px", fontSize:"16px",justifyContent:"left"}}> Plot Name : </InputLabel>
                   
                        <Select
                        
                        
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formValues.plotId}
                            name ="plotId"
                            label="plotName"
                            onChange={handleChange}
                            style = {{width: 300,backgroundColor:"inherit",  height: 40,
                            borderRadius: "10px",borderColor:"lime"}}
                        >
                           
                           
                            {
                                plots?.map((plot) => (
                                    <MenuItem value={plot._id} key={plot._id}>
                                        {plot.plotname}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                       
                    </Grid>
                   
                    <br/>
                   
                    <Grid item className="inp">
                    <InputLabel shrink htmlFor="Quantity-input" style = {{color:"white" , paddingTop:"10px", fontSize:"16px",justifyContent:"left"}}> Quantity : </InputLabel>
                        <input className="inp"
                            id="Quantity-input"
                            name="q"
                            label="Quantity"
                            type="number"
                            value={formValues.q}
                            onChange={handleChange}
                            style = {{width: 300,backgroundColor:"inherit",  height: 40,
                            borderRadius: "10px",borderColor:"lime"}}
                        />
                    </Grid>
                    <br />
                    <Button variant="contained" color="primary" type="submit" style={{marginTop: "15px" ,marginRight:"22%"}}>
                        Submit
                    </Button>
                </Grid>
            </form>
            <br/><br/><br/><br/>
            <Table permutations={data} formValues={formValues} todoId={cropId}/>

            </>

          
    )
}
}