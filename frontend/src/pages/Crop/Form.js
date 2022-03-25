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
    cropname:"",
    s1:0,
    s2:0,
    s3:0,
    prodPer5:0,
    demand:[],
    supply:[],
};

export default function Crop() {

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
        console.log(formValues);
        // idhar axios call ayega database mai update karne keleye
        ( async()=>{
            const plot = await axios.get('http://localhost:5000/createcrop',{
                withCredentials:true,
            });
        })();

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
                    <InputLabel shrink htmlFor="cropname-input"> Crop Name </InputLabel>
                        <TextField
                            id="cropname-input"
                            name="cropname"
                            label="Crop Name"
                            type="text"
                            value={formValues.cropname}
                            onChange={handleChange}
                        />
                    </Grid>
                    <br/>
                    <Grid item>
                    <InputLabel shrink htmlFor="s1-input"> S1 </InputLabel>
                        <TextField
                            id="s1-input"
                            name="s1"
                            label="s1"
                            type="number"
                            value={formValues.s1}
                            onChange={handleChange}
                        />
                    </Grid>
                    <br/>
                    <Grid item>
                    <InputLabel shrink htmlFor="s2-input"> S2 </InputLabel>
                        <TextField
                            id="s2-input"
                            name="s2"
                            label="s2"
                            type="number"
                            value={formValues.s2}
                            onChange={handleChange}
                        />
                    </Grid>
                    <br />
                    <Grid item>
                    <InputLabel shrink htmlFor="s3-input"> S3 </InputLabel>
                        <TextField
                            id="s3-input"
                            name="s3"
                            label="s3"
                            type="number"
                            value={formValues.s3}
                            onChange={handleChange}
                        />
                    </Grid>
                    <br />
                    <Grid item>
                    <InputLabel shrink htmlFor="prodPer5-input"> Production Per 5 Crops </InputLabel>
                        <TextField
                            id="prodPer5-input"
                            name="prodPer5"
                            label="prodPer5"
                            type="number"
                            value={formValues.prodPer5}
                            onChange={handleChange}
                        />
                    </Grid>
                    <br />
                    <Grid item>
                    <InputLabel shrink htmlFor="area-input"> Area Of the Plots </InputLabel>
                        <TextField
                            id="area-input"
                            name="areaofparcel"
                            label="Area of Parcel"
                            type="number"
                            value={formValues.areaofparcel}
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