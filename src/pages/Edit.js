import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { getSingleUser, updateUser } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
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

const Edit = () => {
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
  const { user } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const { name, email, contact, gender } = state;

  useEffect(() => {
    dispatch(getSingleUser(id))
  },[])

  useEffect(() => {
    if (user) {
      setState({...user})
    }
  }, [user])

    const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({...state, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact || !gender) {
      setError("All fields are required!")
    }
    else {
      dispatch(updateUser(state, id))
      navigate("/")
      setError("")
    }
  }

  return (
    <div>
      <h2 style={{marginTop: '5%', color: 'Blue'}}>Edit User</h2>
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
          startIcon={<EditIcon/>}
          onClick={handleSubmit}
        >
          Edit
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

export default Edit