import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import axios from "axios";

import "./Notecard.css";

import { TextField } from "@mui/material";
import { sizeWidth } from "@mui/system";
import { BASE_API_URL } from "../../constant";

export default function Notecard(props) {
  const crop = props.crop;
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };
  
  useEffect(async () => {
    setLoading(false);
  }, []);

  const handleSaveChange = (NID) => {
    (async () => {
      const updatedCrop = await axios.post(
        `${BASE_API_URL}/addCrop/${NID}`,
        crop,
        {
          withCredentials: true,
        }
      );
    })();
    setOpen(false);
  };

  

  if (isLoading) return "Loading...";
  else {
    return (
      <React.Fragment>
        <div>
          <Modal
            open={open}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box className="container">
              <TextField
                sx={{ width: "100%", height: "50px" }}
                id="titlefield"
                freesolo
                defaultValue={crop.cropname}
                onChange={(event) => {
                  crop.cropname = event.target.value;
                }}
                placeholder=""
              ></TextField>

              <br />
              <div className="CodeM"></div>
              <br />

              <div className="bottom">
                
                
                 <div className="item">
                  <Button
                    className=" buttonqs item"
                    sx={{
                      color: "white",
                      padding: " 0 12px",
                      borderRadius: "32px",
                    }}
                    onClick={() => {
                      handleSaveChange(crop._id);
                    }}
                  >
                    Save
                  </Button>
                </div> 
              </div>
            </Box>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}
