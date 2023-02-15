import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, loadUsers } from '../redux/action';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { ButtonGroup, Card, Typography } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from 'react-router-dom';
import { Box, Stack } from '@mui/system';

const useButtonStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    '& > *': {
      margin: 0,
    },
  },
}))

const Home = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let buttonStyles = useButtonStyles();

  const { users } = useSelector(state => state.data);

  
  useEffect(() => {
    dispatch(loadUsers())
  }, [])

  const handleDete = (id) => {
    dispatch(deleteUser(id))
  }

  return (
    <div>
      <Typography
          sx={{fontSize: { xs: "1.7rem", sm: "2rem" }, fontWeight: "700", color: "Blue", width: '80vw', margin: 'auto', marginTop: '3vh'}}
        >
          Simple CRUD React Redux MUI project
        </Typography>
        <Button
          style={{ marginTop: "2%", marginLeft: 0}}
          color='success'
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => navigate('/addUser')}
        >
          Add User
        </Button>
      <TableContainer component={Paper} sx={{ display: { xs: "none", sm: "table" }}}>
        <Table sx={{ marginTop: '2%'}} aria-label="simple table">
          <TableHead >
            <TableRow
              sx={{
                borderTop: "2px solid black",
                borderBottom: "2px solid black",
                "& th": {
                  fontSize: "1rem",
                  fontWeight: "700",
                  color: "rgba(96, 96, 96)"
                }
              }}
            >
              <TableCell align='center'>Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Contact</TableCell>
              <TableCell align="center">Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
              >
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.contact}</TableCell>
                <TableCell align="center">{user.gender}</TableCell>
                <TableCell align='center' width={300}>
                  <div className={buttonStyles.root} style={{paddingLeft: 0}}>
                    <ButtonGroup variant='outlined' aria-label='outlined button group'>
                      <Button
                        style={{ marginRight: 10 }}
                        color="primary"
                        variant='contained'
                        startIcon={<EditIcon />}
                        onClick={()=> navigate(`/edit/${user.id}`)}
                      >Edit
                      </Button>
                      <Button
                        style={{ marginLeft: 10}}
                        color="warning"
                        variant='contained'
                        startIcon={<DeleteIcon />}
                        onClick={()=>handleDete(user.id)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: { xs: "Block", sm: "none" } }} mt={5} mb={5}>
        {users.map((user) => (
          <Box
            key={user.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            margin={'auto'}
            width={'80vw'}
          >
            <Stack direction="row" ml={5} mt={1}>
              <Typography sx={{fontSize: '1rem', fontWeight: 700, width: 100, textAlign: 'left'}}>Name:</Typography>
              <Box align="center">{user.name}</Box>
            </Stack>
            <Stack direction="row" ml={5} mt={1}>
              <Typography sx={{ fontSize: '1rem', fontWeight: 700, width: 100, textAlign: 'left' }}>Email:</Typography>
              <Box align="center">{user.email}</Box>
            </Stack>
            <Stack direction="row" ml={5} mt={1}>
              <Typography sx={{fontSize: '1rem', fontWeight: 700, width: 100, textAlign: 'left'}}>Contact:</Typography>
              <Box align="center">{user.contact}</Box>
            </Stack>
            <Stack direction="row" ml={5} mt={1}>
              <Typography sx={{fontSize: '1rem', fontWeight: 700, width: 100, textAlign: 'left'}}>Gender:</Typography>
              <Box align="center">{user.gender}</Box>
            </Stack>
            <Stack align='center' width={300}>
              <div className={buttonStyles.root} style={{ paddingLeft: 0 }}>
                <ButtonGroup variant='outlined' aria-label='outlined button group'>
                  <Button
                    style={{ marginRight: 10 }}
                    color="primary"
                    variant='contained'
                    startIcon={<EditIcon />}
                    onClick={()=> navigate(`/edit/${user.id}`)}
                  >Edit
                  </Button>
                  <Button
                    style={{ marginLeft: 10}}
                    color="warning"
                    variant='contained'
                    startIcon={<DeleteIcon />}
                    onClick={()=>handleDete(user.id)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </div>
            </Stack>
          </Box>
        ))}
      </Box>
    </div>
  )
}

export default Home;