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

import Notecard from "../../Components/Notecard/Notecard";
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
  const plots = props.plots;

  const handleDeleteChange = (plotId)=>{
    console.log(plotId);
    ( async()=>{
        const delData = await axios.post(`${BASE_API_URL}/deletePlot/${plotId}`,{
          withCredentials:true,
        });
        console.log(delData);
        const plots = await axios.get(`${BASE_API_URL}/getAllPlots`,{
            withCredentials:true,
        });
        const nd = await plots.data;
        console.log(nd);
        props.onChange(nd);
    })();

  };
  

  return (
    <>
      <div className="tabht">
        {plots ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead className="headt">
                  <TableRow>
                    <StyledTableCell style={{ width: 15 }}>
                      Sr. No.
                    </StyledTableCell>
                    <StyledTableCell align="center">Plot Name</StyledTableCell>
                    <StyledTableCell align="center">Total Number of Parcels </StyledTableCell>
                    <StyledTableCell align="center"> Length Of Each Parcel </StyledTableCell>
                    <StyledTableCell align="center"> Width of Each Parcel  </StyledTableCell>
                    <StyledTableCell align="center"> Delete </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {plots.map((plot, ind) => (
                    // console.log(plot);

                    <StyledTableRow key={plot._id}>
                      <StyledTableCell
                        component="th"
                        scope="plot"
                        style={{ width: 15 }}
                      >
                        {" "}
                        {ind + 1}{" "}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {plot.plotname}
                       
                      </StyledTableCell>
                      <StyledTableCell id="diff" align="center">
                        {plot.parcelCnt}
                      </StyledTableCell>
                      <StyledTableCell id="diff" align="center">
                        {plot.parcelLength}
                      </StyledTableCell>
                      <StyledTableCell id="diff" align="center">
                        {plot.parcelWidth}
                      </StyledTableCell>
                      <StyledTableCell sx={{fontSize:"9pt"}} align="center" > 
                        <Button
                          onClick={ ()=>{
                            console.log(plot._id);
                            handleDeleteChange(plot._id);
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
