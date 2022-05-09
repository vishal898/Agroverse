import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
// import input from '@mui/material/input';
import InputLabel from '@mui/material/InputLabel';
import { BASE_API_URL } from "../../constant";
import "./Form.css";

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
            
           <form onSubmit={handleSubmit}  className=' plot' >
                <Grid container alignItems="center" justify="center" direction="column">
                    <Grid item>
                    <InputLabel shrink htmlFor="plotname-input"  style = {{color:"white" , paddingTop:"10px", fontSize:"16px"}}> Plot Name : </InputLabel>
                        <input className="inp"
                            id="plotname-input"
                            name="plotname"
                            label="plot Name"
                            type="text"
                            value={formValues.plotname}
                            onChange={handleChange}
                            style = {{width: 300,backgroundColor:"inherit",  height: 40,
                            borderRadius: "10px",borderColor:"lime"}}
                        />
                    </Grid>
                    <br/>
                    <Grid item>
                    <InputLabel shrink htmlFor="Total Number of Parcels-input"  style = {{color:"white" , paddingTop:"10px", fontSize:"16px"}}> Total Number of Parcels : </InputLabel>
                        <input className="inp"
                            id="Total Number of Parcels-input"
                            name="parcelCnt"
                            label="Total Number of Parcels"
                            type="number"
                            value={formValues.parcelCnt}
                            onChange={handleChange}
                             style = {{width: 300,backgroundColor:"inherit",  height: 40,
                            borderRadius: "10px",borderColor:"lime"}}
                        />
                    </Grid>
                    <br/>
                    <Grid item>
                    <InputLabel shrink htmlFor=" Length Of Each Parcel-input" style = {{color:"white" , paddingTop:"10px", fontSize:"16px"}}>  Length Of Each Parcel : </InputLabel>
                        <input className="inp"
                            id=" Length Of Each Parcel-input"
                            name="parcelLength"
                            label=" Length Of Each Parcel"
                            type="number"
                            value={formValues.parcelLength}
                            onChange={handleChange}
                            style = {{width: 300,backgroundColor:"inherit",  height: 40,
                            borderRadius: "10px",borderColor:"lime"}}
                        />
                    </Grid>
                    <br />
                    <Grid item>
                    <InputLabel shrink htmlFor="Width of Each Parcel-input" style = {{color:"white" , paddingTop:"10px", fontSize:"16px"}}> Width of Each Parcel : </InputLabel>
                        <input className="inp"
                            id="Width of Each Parcel-input"
                            name="parcelWidth"
                            label="Width of Each Parcel"
                            type="number"
                            value={formValues.parcelWidth}
                            onChange={handleChange}
                            style = {{width: 300,backgroundColor:"inherit",  height: 40,
                            borderRadius: "10px",borderColor:"lime"}}
                        />
                    </Grid>
                    <br />
                    <Button variant="contained" color="primary" type="submit"style={{marginTop: "15px" ,marginRight:"16%"}}>
                        Submit
                    </Button>
                </Grid>
            </form>
            </div>
       
    )
}