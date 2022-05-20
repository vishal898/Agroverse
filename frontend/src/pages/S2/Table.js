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
  console.log(props)
  const perms = props.permutations;
  const plotId =props.formValues.plotId;
  const q = props.formValues.q;
  const todoId =props.todoId;
  const [select,setSelect]=useState(false);
  console.log(perms);
  // console.log(crops)
  const handleSubmitChange = (items)=>{
    console.log(items);
    ( async()=>{
      const selectPlot = await axios.post(`${BASE_API_URL}/updateTodoS2/${todoId}/${plotId}/${q}`,items,{
        withCredentials:true,
      });
      setSelect(true);
      console.log("selected");
      console.log(selectPlot);
    })();

  };
  

  return (
    <>
      <div className="tabht">
        {perms ? (
          <>
         
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
              
                <TableBody>
                {perms.map((items, index) => {
                  return (
                    <StyledTableRow>
                      {items.map((subItems, sIndex) => {
                         if(subItems > 0){
                        return <>
                       
                        <StyledTableCell className="item"style = {{backgroundColor:(subItems===1)?"#008000":(subItems===2)?"#00FF00":(subItems===3)?"#FFFF00":(subItems===4)?"#FF0000":(subItems===5)?"#FFA500":"#800080" }}> {subItems} </StyledTableCell> 
                        
                       
                        </>};
                      })}
                       <StyledTableCell sx={{fontSize:"9pt"}} align="center" > 
                        <Button
                          onClick={ ()=>{
                            
                            handleSubmitChange(items);
                          }}
                          color="secondary" >
                          Select
                        </Button>   
                      </StyledTableCell>
                     </StyledTableRow>
                  );
                })}
                 
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <br />
            {
            select && window.open('http://localhost:3000/home', '_blank')
            
          }
          </>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
