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


import './S2.css';
const defaultValues = {
    cropId:"",
    q:null,
    date1:null,
    date2:null
};

export default function Form() {

    const [formValues, setFormValues] = useState(defaultValues);
    const [plots, setPlots] = useState([]);
    const [boolVal, setBoolVal] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name+ " "+ value);
        setFormValues({
          ...formValues,
          [name]: value,
        });
    };

    const handleSubmit = (event) => {
        // event.prevent    Default();
        console.log("handleSumbitClicked");
        console.log(formValues);
        ( async()=>{
            const Demand = await axios.post(`${BASE_API_URL}/addDemand`,formValues,{
              withCredentials:true,
            });
            alert("Demand Added Successfully");
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
                            name ="cropId"
                            label="cropName"
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
                    <Button variant="contained" color="primary" type="submit" style={{marginTop: "15px" ,marginRight:"16%"}}>
                        Submit
                    </Button>
                </Grid>
            </form>
            </>
          
    )
}
}