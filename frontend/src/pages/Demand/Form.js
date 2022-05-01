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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { BASE_API_URL } from "../../constant";

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import "./Form.css"
const defaultValues = {
    cropId:"",
    q:null,
    date1:null,
    date2:null
};

export default function Form({ onFormSubmit }) {

    const [formValues, setFormValues] = useState(defaultValues);
    const [crops, setCrops] = useState([]);
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
        event.preventDefault();
        console.log("handleSumbitClicked");
        console.log(formValues);
        onFormSubmit(formValues);
    };

    const fetchAllCrops = async () => {
        try {
            setLoading(true);
            let condition = {active: true}
            const cs = await axios.get(`${BASE_API_URL}/getAllCrops`,{withCredentials:true});
            console.log(cs.data);
            crops?.map((crop) => {
                console.log(crop);
            });
            setCrops(cs.data);
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
        <div>
            <div className='plot-form formDiv'>
           <form onSubmit={handleSubmit}>
                <Grid className="grid" container alignItems="center" justify="center" direction="column">
                    <Grid item className="inp">
                    <InputLabel shrink htmlFor="plotname-input"> Crop Name </InputLabel>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formValues.cropId}
                            name ="cropId"
                            label="cropName"
                            onChange={handleChange}
                            style = {{width: 300}}
                        >
                            {/* {console.log(crops)} */}
                            {
                                crops?.map((crop) => (
                                    <MenuItem value={crop._id} key={crop._id}>
                                        {crop.cropname}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                    <br/>
                    <Grid item className="inp">
                    <InputLabel shrink htmlFor=" Start Date-input">  Start Date </InputLabel>
                    <input
                        name="date1"
                        type="date"
                        value={formValues.date1}
                        minDate={new Date()}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </Grid> 
                    <br/>
                    <Grid item className="inp">
                    <InputLabel shrink htmlFor=" END Date-input">  END Date </InputLabel>
                    <input
                        name="date2"
                        type="date"
                        value={formValues.date2}
                        minDate={new Date()}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </Grid>
                    <br />
                    <Grid item className="inp">
                    <InputLabel shrink htmlFor="Quantity-input"> Quantity </InputLabel>
                        <TextField
                            id="Quantity-input"
                            name="q"
                            label="Quantity"
                            type="number"
                            value={formValues.q}
                            onChange={handleChange}
                            style = {{width: 300}}
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
}