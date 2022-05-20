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
  const S2 = props.S2;

  const handleDeleteChange = (todoId)=>{
    console.log(todoId);
    ( async()=>{
       
       
        const S2 = await axios.get(`${BASE_API_URL}/getTodoS2`,{
            withCredentials:true,
        });
        const nd = await S2.data;
        console.log(nd);
        props.onChange(nd);
    })();

  };
  

  return (
    <>
      <div className="tabht">
        {S2 ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead className="headt">
                  <TableRow>
                    <StyledTableCell style={{ width: 15 }}>
                      Sr. No.
                    </StyledTableCell>
                    <StyledTableCell align="center">Crop Name</StyledTableCell>
                    <StyledTableCell align="center">Quantity </StyledTableCell>
                    <StyledTableCell align="center"> Select Plot </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {S2.map((crop, ind) => (
                    // console.log(plot);

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
                      {crop.cropId.cropname}
                       
                      </StyledTableCell>
                      <StyledTableCell id="diff" align="center">
                        {crop.quantity}
                      </StyledTableCell>
                     
                      <StyledTableCell sx={{fontSize:"9pt"}} align="center" > 
                     
                        <Button
                          onClick={ ()=>{
                            
                            
                          }}
                          href="http://localhost:3000/S2"
                          color="secondary" >
                          Select Plot
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
