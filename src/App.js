import './App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useState } from 'react';

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';


export default function App() {

  const [counter, setCounter] = useState(0);

  const [message, setMessage] = useState('');

  //const [test, setTest] = useState('');

  const [updated, setUpdated] = useState(message);

  const [workList, setWorkList] = useState([]);

  // const handleChange = (event) => {
  //   setMessage(event.target.value);
  //   // setTest(event.target.value);
  // };

  const handleClick = () => {
    // 👇 "message" stores input field value
    if(workList.includes(message)){
      alert("Task already exists");
    }
    else{
      setUpdated(message);
      setCounter(count => count + 1);
      setWorkList((preState => [...preState,message]))
    }
    // setUpdated(message);
    // setCounter(count => count + 1);
    // setWorkList((preState => [...preState,message]))    
    // setWorkList(workList.concat(<div className='item' key={workList.length}>
    //   <input type="checkbox"></input>
    //   <p>{message}</p>
    //   <Button startIcon={<DeleteIcon />} ></Button>
      
    // </div>));
  };

  const handleClickDelete = () => {
    setWorkList([]);
    setCounter(count => 0);
  };

  // const deleteSpecific = () => {
  //   setWorkList([]);
  //   setCounter(count => count -1);
  // };

  const handleDeleteTest = (item) => {
    console.log(item)
    //workList.splice(workList.indexOf(item), 1);
    //setWorkList(workList.splice(workList.indexOf(item), 1));
    setWorkList(workList.filter((i) => i !== item));
  }

  const [open, setOpen] = React.useState(false);
console.log(workList)
  
  return (
    <>
      <div className="flex-container">
        <div className="flex-items beauty">
          <h1>TO DO LIST APP</h1>
          <div>
            <input type="text" placeholder="Add a new task" id="message"
              name="message"
              onChange={(e)=> setMessage(e.target.value)}
              value={message} />
            <Button  disabled={!message} variant="contained"  onClick={(e) => {
              handleClick();
              setMessage('');
            }}>Add</Button><br></br><br></br>
            <Button variant="contained" color="error"  onClick={() => {
              handleClickDelete();
              setOpen(true);
            }}>Delete all</Button>
          </div>
          <div className='inbox'>
          { workList?.map((i, index) =>( 
          
            <div className='item'>
              <input type="checkbox" />
              <p key={index}>{i}</p> 
              {/* <DeleteIcon onClick={()=> handleDeleteTest(i)}/> */}
              <Button startIcon={<DeleteIcon/>}  onClick={()=> handleDeleteTest(i)}  ></Button>
            </div> 
           
           ) )}

          </div> 
        </div>
        <br></br>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            startDecorator={<WarningRoundedIcon />}
          >
            Confirmation
          </Typography>
          <Divider />
          <p>Are you sure, you really want to delete all of you tasks?</p>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={() =>{ handleClickDelete() ;setOpen(false)}}>
              Discard All Tasks
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
}