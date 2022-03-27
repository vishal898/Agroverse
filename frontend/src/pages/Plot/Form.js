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
import { BASE_API_URL } from "../../constant";

const defaultValues = {
    plotname:"",
    parcelCnt:null,
    parcelLength:null,
    parcelWidth:null,
    parcels:[],
    demand:[],
    supply:[],
};

export default function Form({ onFormSubmit }) {

    const [formValues, setFormValues] = useState(defaultValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name+ " "+ value);
        setFormValues({
          ...formValues,
          [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("handleSumbitClicked");
        console.log(formValues);
        onFormSubmit(formValues);
    };


    // useEffect(()=>{
    // },[]);

    return (
        <div  >
            <div className='plot-form'>
           <form onSubmit={handleSubmit}>
                <Grid container alignItems="center" justify="center" direction="column">
                    <Grid item>
                    <InputLabel shrink htmlFor="plotname-input"> Plot Name </InputLabel>
                        <TextField
                            id="plotname-input"
                            name="plotname"
                            label="plot Name"
                            type="text"
                            value={formValues.plotname}
                            onChange={handleChange}
                        />
                    </Grid>
                    <br/>
                    <Grid item>
                    <InputLabel shrink htmlFor="Total Number of Parcels-input"> Total Number of Parcels </InputLabel>
                        <TextField
                            id="Total Number of Parcels-input"
                            name="parcelCnt"
                            label="Total Number of Parcels"
                            type="number"
                            value={formValues.parcelCnt}
                            onChange={handleChange}
                        />
                    </Grid>
                    <br/>
                    <Grid item>
                    <InputLabel shrink htmlFor=" Length Of Each Parcel-input">  Length Of Each Parcel </InputLabel>
                        <TextField
                            id=" Length Of Each Parcel-input"
                            name="parcelLength"
                            label=" Length Of Each Parcel"
                            type="number"
                            value={formValues.parcelLength}
                            onChange={handleChange}
                        />
                    </Grid>
                    <br />
                    <Grid item>
                    <InputLabel shrink htmlFor="Width of Each Parcel-input"> Width of Each Parcel </InputLabel>
                        <TextField
                            id="Width of Each Parcel-input"
                            name="parcelWidth"
                            label="Width of Each Parcel"
                            type="number"
                            value={formValues.parcelWidth}
                            onChange={handleChange}
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