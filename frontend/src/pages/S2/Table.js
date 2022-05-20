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
  const perms = props.permutations;
  console.log(perms);
  // console.log(crops)
  // const handleDeleteChange = (todoId)=>{
  //   console.log(todoId);
  //   ( async()=>{
        
  //   })();

  // };
  

  return (
    <>
      <div className="tabht">
        {perms ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                {/* <TableHead className="headt">
                  <TableRow>
                    <StyledTableCell style={{ width: 15 }}>
                      Sr. No.
                    </StyledTableCell>
                    <StyledTableCell align="center">Crop Name</StyledTableCell>
                    <StyledTableCell align="center">Quantity </StyledTableCell>
                    <StyledTableCell align="center"> Done </StyledTableCell>
                  </TableRow>
                </TableHead> */}
                <TableBody>
                {perms.map((items, index) => {
                  return (
                    <ol>
                      {items.map((subItems, sIndex) => {
                        return <li> {subItems} </li>;
                      })}
                    </ol>
                  );
                })}
                  {/* {perms.map((perm, ind) => (
                    // console.log(plot);
                    return ({perm.map((ele,ind))=(
                      <StyledTableCell align="center">
                      {ele}
                       
                      </StyledTableCell>
                    )})
                  ))} */}
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
