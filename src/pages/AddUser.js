import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { addUser } from '../redux/action';
import { useDispatch} from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';

const formWidth = window.innerWidth >= 900 ? "50ch" : "30ch";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    "& > *": {
      width: `${formWidth}`
    },
  },
}))

const AddUser = () => {
  const classes = useStyles();
  let navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    gender: ""
  });
  
  const [error, setError] = useState("");
  let { id } = useParams();
  const dispatch = useDispatch()
  const { name, email, contact, gender } = state;
  
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({...state, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact || !gender) {
      setError("All fields are required!");
    }
    else {
      dispatch(addUser(state, id));
      navigate("/");
      setError("");
    }
  }

  return (
    <div>
      <h2 style={{marginTop: '5%', color: 'Blue'}}>Add User</h2>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <form className={classes.root} noValidate autoComplete='off' style={{marginTop: '2%'}}>
        <TextField
          id="standard-basic"
          label="name"
          value={name || ""}
          type='text'
          name='name'
          onChange={handleInputChange}
          variant="standard"
        />
        <br/>
        <TextField
          id="standard-basic"
          label="email"
          value={email || ""}
          type='email'
          name='email'
          onChange={handleInputChange}
          variant="standard"
        />
        <br/>
        <TextField
          id="standard-basic"
          label="contact"
          value={contact || ""}
          type='text'
          name='contact'
          onChange={handleInputChange}
          variant="standard"
        />
        <br/>
        <TextField
          id="standard-basic"
          label="gender"
          value={gender || ""}
          type='text'
          name='gender'
          onChange={handleInputChange}
          variant="standard"
        />
        <br />
        <Button
          style={{ width: "auto", marginTop: 60, marginRight: 20}}
          color='primary'
          variant="contained"
          type='submit'
          startIcon={<AddIcon/>}
          onClick={handleSubmit}
        >
          Add User
        </Button>
        <Button
          style={{ width: "auto", marginTop: 60}}
          color='primary'
          variant="contained"
          type='submit'
          startIcon={<CancelIcon />}
          onClick={()=>navigate("/")}
        >
          Cancel
        </Button>
      </form>
    </div>
  )
}

export default AddUser