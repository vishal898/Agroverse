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
  const demands = props.demands;

  const handleDeleteChange = (demandId)=>{
    console.log(demandId);
    ( async()=>{
        const delData = await axios.post(`${BASE_API_URL}/deletedemand/${demandId}`,{
          withCredentials:true,
        });
        console.log(delData);
        const demands = await axios.get(`${BASE_API_URL}/getAllDemands`,{
            withCredentials:true,
        });
        const nd = await demands.data;
        console.log(nd);
        props.onChange(nd);
    })();

  };
  

  return (
    <>
      <div className="tabht">
        {demands ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead className="headt">
                  <TableRow>
                    <StyledTableCell style={{ width: 15 }}>
                      Sr. No.
                    </StyledTableCell>
                    <StyledTableCell align="center">demand Name</StyledTableCell>
                    <StyledTableCell align="center">Total Number of Parcels </StyledTableCell>
                    <StyledTableCell align="center"> Length Of Each Parcel </StyledTableCell>
                    <StyledTableCell align="center"> Width of Each Parcel  </StyledTableCell>
                    <StyledTableCell align="center"> Delete </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {demands.map((demand, ind) => (
                    // console.log(demand);

                    <StyledTableRow key={demand._id}>
                      <StyledTableCell
                        component="th"
                        scope="demand"
                        style={{ width: 15 }}
                      >
                        {" "}
                        {ind + 1}{" "}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {demand.demandname}
                       
                      </StyledTableCell>
                      <StyledTableCell id="diff" align="center">
                        {demand.parcelCnt}
                      </StyledTableCell>
                      <StyledTableCell id="diff" align="center">
                        {demand.parcelLength}
                      </StyledTableCell>
                      <StyledTableCell id="diff" align="center">
                        {demand.parcelWidth}
                      </StyledTableCell>
                      <StyledTableCell sx={{fontSize:"9pt"}} align="center" > 
                        <Button
                          onClick={ ()=>{
                            console.log(demand._id);
                            handleDeleteChange(demand._id);
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
