import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

const defaultValues = {
    name: "",
    parcels: null,
    areaofparcel: null,
};

export default function Plot() {
   
    const [formValues, setFormValues] = useState(defaultValues);
    
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
        console.log(formValues);
        // idhar axios call ayega database mai update karne keleye 
        // ( async()=>{
        //     const plot = await axios.get('http://localhost:5000/createplot',{
        //         withCredentials:true,
        //     });
        // })();
        
        // after adding new plot details 
        // set the formvalues default again -- basically refresh form 


        // so as we are doing axios call here i don't think we need use effect now . 
    };

    // useEffect(()=>{
    // },[]);


    return (        
        <div  >
            <div className='plot-form'> 
           <form onSubmit={handleSubmit}>
                <Grid container alignItems="center" justify="center" direction="column">
                    <Grid item>
                    <InputLabel shrink htmlFor="name-input"> Name Of The Plot </InputLabel>
                        <TextField
                            id="name-input"
                            name="name"
                            label="Name"
                            type="text"
                            value={formValues.name}
                            onChange={handleNameChange}
                        />
                    </Grid>
                    <br/>
                    <Grid item>
                    <InputLabel shrink htmlFor="noofparcels-input"> Number Of Parcels </InputLabel>
                        <TextField
                            id="noofparcel-input"
                            name="parcels"
                            label="No of Parcels"
                            type="number"
                            value={formValues.parcels}
                            onChange={handleParcelsChange}
                        />
                    </Grid>
                    <br/>
                    <Grid item>
                    <InputLabel shrink htmlFor="area-input"> Area Of the Plots </InputLabel>
                        <TextField
                            id="area-input"
                            name="areaofparcel"
                            label="Area of Parcel"
                            type="number"
                            value={formValues.areaofparcel}
                            onChange={handleAreaChange}
                        />
                    </Grid>
                    <br />
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Grid>
            </form>
            </div>
        </div>
    )
}