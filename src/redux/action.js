import * as types from  "./actionType";
import axios from 'axios';
const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

const userDeleted = () => ({
  type: types.DELETE_USER,
})
const getUser = (user) => ({
  type: types.GET_SINGLE_USER,
  payload: user,
})
const userUpdated = () => ({
  type: types.UPDATE_USER,
})
const userAdded = () => ({
  type: types.ADD_USER,
})

export const getSingleUser = (id) => {
  return function (dispatch) {
    axios.get(`http://localhost:5000/users/${id}`).then((resp) => {
      console.log('resp', resp)
      dispatch(getUser(resp.data))
    }).catch(error => console.log(error))
  }
}

export const addUser = (user) => {
  return function (dispatch) {
    axios.post(`http://localhost:5000/users`, user)
      .then((resp) => {
      console.log('resp', resp)
        dispatch(userAdded())
    }).catch(error => console.log(error))
  }
}
export const updateUser = (user, id) => {
  return function (dispatch) {
    axios.put(`http://localhost:5000/users/${id}`, user)
      .then((resp) => {
      console.log('resp', resp)
        dispatch(userUpdated())
        dispatch(loadUsers())
    }).catch(error => console.log(error))
  }
}

export const deleteUser = (id) => {
  return function (dispatch) {
    axios.delete(`http://localhost:5000/users/${id}`).then((resp) => {
      console.log('resp', resp)
      dispatch(userDeleted())
      dispatch(loadUsers())
    }).catch(error => console.log(error))
  }
}

export const loadUsers = () => {
  return function (dispatch) {
    axios.get(`http://localhost:5000/users`).then((resp) => {
      console.log('resp', resp)
      dispatch(getUsers(resp.data))
    }).catch(error=>console.log(error))
  }
}