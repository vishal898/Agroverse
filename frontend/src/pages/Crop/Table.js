import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "./Table.css";
import { BASE_API_URL } from "../../constant";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables(props) {
  const crops = props.crops;

  const handleDeleteChange = (cropId)=>{
    console.log(cropId);
    ( async()=>{
        const delData = await axios.post(`${BASE_API_URL}/deleteCrop/${cropId}`,{
          withCredentials:true,
        });
        console.log(delData);
        const crops = await axios.get(`${BASE_API_URL}/getAllcrops`,{
            withCredentials:true,
        });
        const nd = await crops.data;
        console.log(nd);
        props.onChange(nd);
    })();

  };
  

  return (
    <>
      <div className="tabht">
        {crops ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead className="headt">
                  <TableRow>
                    <StyledTableCell style={{ width: 15 }}>
                      Sr. No.
                    </StyledTableCell>
                    <StyledTableCell align="center">Crop Name</StyledTableCell>
                    <StyledTableCell align="center">Stage 1 </StyledTableCell>
                    <StyledTableCell align="center">Stage 2 </StyledTableCell>
                    <StyledTableCell align="center">Stage 3 </StyledTableCell>
                    <StyledTableCell align="center">Prod.(in kg)/5 crops </StyledTableCell>
                    <StyledTableCell align="center"> Delete </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {crops.map((crop, ind) => (
                    // console.log(crop);

                    <StyledTableRow key={crop._id}>
                      <StyledTableCell
                        component="th"
                        scope="crop"
                        style={{ width: 15 }}
                      >
                        {" "}
                        {ind + 1}{" "}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {crop.cropname}
                      </StyledTableCell>
                      <StyledTableCell id="diff" align="center">
                        {crop.s1}
                      </StyledTableCell>
                      <StyledTableCell id="diff" align="center">
                        {crop.s2}
                      </StyledTableCell>
                      <StyledTableCell id="diff" align="center">
                        {crop.s3}
                      </StyledTableCell>
                      <StyledTableCell id="diff" align="center">
                        {crop.prodPer5}
                      </StyledTableCell>
                      <StyledTableCell sx={{fontSize:"9pt"}} align="center" > 
                        <Button
                          onClick={ ()=>{
                            console.log(crop._id);
                            handleDeleteChange(crop._id);
                          }}
                          color="secondary" >
                          DELETE
                        </Button>   
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <br />
          </>
        ) : (
          <div>isLoading</div>
        )}
      </div>
    </>
  );
}
