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
import "./Form.css"

const defaultValues = {
    cropname:"",
    s1:null,
    s2:null,
    s3:null,
    prodPer5:null,
    demand:[],
    supply:[],
};

const styles = theme => ({
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "yellow !important"
    }
  });


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
       
           <form onSubmit={handleSubmit} className=' crop' >
                <Grid className="grid" container alignItems="left"  direction="column">
                   
                    <InputLabel shrink htmlFor="cropname-input"  style = {{color:"white" , paddingTop:"10px", fontSize:"16px",justifyContent:"left"}}> Crop Name :  </InputLabel>
                        <input className="inp"
                            id="cropname-input"
                            name="cropname"
                            label="Crop Name"
                            type="text"
                            value={formValues.cropname}
                            onChange={handleChange}
                            style = {{width: 300,backgroundColor:"inherit",  height: 40,
                            borderRadius: "10px",borderColor:"lime"}}
                           
                            
                        />
                    
                    <br/>
                    
                    
                    <InputLabel shrink htmlFor="s1-input" style = {{color:"white" , paddingTop:"10px", fontSize:"16px"}}> S1 : </InputLabel>
                        <input className="inp"
                            id="s1-input"
                            name="s1"
                            label="s1"
                            type="number"
                            value={formValues.s1}
                            onChange={handleChange}
                            style = {{width: 300,backgroundColor:"inherit",  height: 40,
                            borderRadius: "10px",borderColor:"lime"}}
                        />
                   
                    <br/>
                    
                    <InputLabel shrink htmlFor="s2-input"  style = {{color:"white" , paddingTop:"10px", fontSize:"16px"}}> S2 : </InputLabel>
                        <input className="inp"
                            id="s2-input"
                            name="s2"
                            label="s2"
                            type="number"
                            value={formValues.s2}
                            onChange={handleChange}
                            style = {{width: 300,backgroundColor:"inherit",  height: 40,
                            borderRadius: "10px",borderColor:"lime"}}
                        />
                    
                    <br />
                   
                    <InputLabel shrink htmlFor="s3-input"  style = {{color:"white" , paddingTop:"10px", fontSize:"16px"}}> S3 :  </InputLabel>
                        <input className="inp"
                            id="s3-input"
                            name="s3"
                            label="s3"
                            type="number"
                            value={formValues.s3}
                            onChange={handleChange}
                            style = {{width: 300,backgroundColor:"inherit",  height: 40,
                            borderRadius: "10px",borderColor:"lime"}}
                        />
                    
                    <br />
                   
                    <InputLabel shrink htmlFor="prodPer5-input"  style = {{color:"white" , paddingTop:"10px", fontSize:"16px"}}> Production Per 5 Crops : </InputLabel>
                        <input className="inp"
                            id="prodPer5-input"
                            name="prodPer5"
                            label="prodPer5"
                            type="number"
                            value={formValues.prodPer5}
                            onChange={handleChange}
                            style = {{width: 300,backgroundColor:"inherit",  height: 40,
                            borderRadius: "10px",borderColor:"lime"}}
                        />
                  
                    <br />
                   
                    <InputLabel shrink htmlFor="areaPer5-input"  style = {{color:"white" , paddingTop:"10px", fontSize:"16px"}}> Area Per 5 Plants : </InputLabel>
                        <input className="inp"
                            id="areaPer5-input"
                            name="areaPer5"
                            label="areaPer5"
                            type="number"
                            value={formValues.areaPer5}
                            onChange={handleChange}
                            style = {{width: 300,backgroundColor:"inherit",  height: 40,
                            borderRadius: "10px",borderColor:"lime"}}
                        />
                   
                    <br />
                    <Button variant="contained" color="primary" type="submit" style={{marginTop: "15px" ,marginRight:"16%"}} >
                        Submit
                    </Button>
                    </Grid> 
            </form>
          
       
    )
}