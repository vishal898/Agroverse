import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./Demandcard.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_API_URL } from "../../constant";

import Demandform from "../../pages/Demand/Form"; 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Demandcard(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFormSubmit = (formValues) => {
    // e.preventDefault();
    console.log("onFormSubmit Clicked in model");
    ( async()=>{
      const Demand = await axios.post(`${BASE_API_URL}/createDemand`,formValues,{
        withCredentials:true,
      });
      const Demands = await axios.get(`${BASE_API_URL}/getAllDemands`,{
          withCredentials:true,
      });
      const nd = await Demands.data;
      console.log(nd);
      props.onChange(nd);
      handleClose();
    })();
  };

  return (
    <div>
      <button className="add" onClick={handleOpen}>Add Demand</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Demandform  onFormSubmit = {onFormSubmit}/>
        </Box>
      </Modal>
    </div>
  );
}