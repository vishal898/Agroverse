import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// import Preview from '../Preview/Preview';

import Notecard from '../../Components/Notecard/Notecard';
// import "./Table.css"
import {BASE_API_URL} from '../../constant';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
  
    color: theme.palette.common.white,
    fontSize: 16
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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables(props) {
  
  const notes = props.notes ;

  // const handleDeleteChange = (noteId)=>{
  //   console.log(noteId);
  //   ( async()=>{
  //       const delData = await axios.post(`${BASE_API_URL}/deleteNote/${noteId}`,{
  //         withCredentials:true,
  //       });
  //       console.log(delData);
  //       const notes = await axios.get(`${BASE_API_URL}/getAllNotes`,{
  //           withCredentials:true,
  //       });
  //       const nd = await notes.data;
  //       console.log(nd);
  //       props.onChange(nd);   
  //   })();
  // };
  // const handleDifficulty=(note,value)=>{
  

  // const handleModal = (note)=>{
  //   //console.log(note);

  // };
  

  // if (isLoading) return "Loading...";
  // else {
  return (
    <>
    <div className="tabht">
    {
      notes
      ?
      <>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className="headt">
          <TableRow>
            <StyledTableCell style={{width: 15}}>Sr. No.</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center">Difficulty</StyledTableCell>
            <StyledTableCell align="center"> Delete </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notes.map((note,ind) => (
            // console.log(note);
            
            <StyledTableRow key={note._id}>
              <StyledTableCell component="th" scope="note" style={{width: 15}}> {ind+1} </StyledTableCell>
              <StyledTableCell align="center"  ><Button
                      onClick={ ()=>{
                        // handleModal(note);
                        console.log(note);
                      }}
                      color="primary"
                    > 
                    {<Notecard note = {note} onClose={(value)=>{console.log(value);note.difficulty=value; document.getElementById("diff").innerHTML = note.difficulty; }}/> }
                    
                    </Button>   
              </StyledTableCell>
              <StyledTableCell id="diff"align="center"  >{note.difficulty}</StyledTableCell>
              {/* <StyledTableCell sx={{fontSize:"9pt"}} align="center" > 
                <Button
                  onClick={ ()=>{
                    handleDeleteChange(note._id);
                  }}
                  color="secondary" >
                  DELETE
                </Button>   
              </StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br /><br />
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    {/* <Preview note={notes}/> */}
    </div>
      </>

      :
      <div>isLoading</div>
     
    }
     </div>
    </>
  );}
// }