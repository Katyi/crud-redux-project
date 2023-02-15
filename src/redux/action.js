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
  return async function (dispatch) {
    // axios.get(`http://localhost:5000/users/${id}`).then((resp) => {
    await axios.get(`https://mock-api-n5tc.onrender.com/users/${id}`).then((resp) => {
      // https://my-json-server.typicode.com/katyi/db-for-crud-redux-project/db
      console.log('resp', resp)
      dispatch(getUser(resp.data))
    }).catch(error => console.log(error))
  }
}

export const addUser = (user) => {
  return async function (dispatch) {
    await axios.post(`https://mock-api-n5tc.onrender.com/users`, user)
      .then((resp) => {
      console.log('resp', resp)
        dispatch(userAdded())
      }).catch(error => console.log(error))
  }
}
export const updateUser = (user, id) => {
  return async function (dispatch) {
    await axios.put(`https://mock-api-n5tc.onrender.com/users/${id}`, user)
      .then((resp) => {
      console.log('resp', resp)
        dispatch(userUpdated())
        dispatch(loadUsers())
    }).catch(error => console.log(error))
  }
}

export const deleteUser = (id) => {
  return async function (dispatch) {
    await axios.delete(`https://mock-api-n5tc.onrender.com/users/${id}`).then((resp) => {
      console.log('resp', resp)
      dispatch(userDeleted())
      dispatch(loadUsers())
    }).catch(error => console.log(error))
  }
}

export const loadUsers = () => {
  return async function (dispatch) {
    await axios.get(`https://mock-api-n5tc.onrender.com/users`).then((resp) => {
      console.log('resp', resp)
      dispatch(getUsers(resp.data))
    }).catch(error=>console.log(error))
  }
}