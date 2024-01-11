// usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  users: [],
  loading: false,
  error: null,
}

// Replace 'http://localhost:5000' with your backend server URL
const serverURL = 'http://localhost:5000'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(`${serverURL}/api/users`)
  return response.data
})

export const addUser = createAsyncThunk('users/addUser', async (user) => {
  const response = await axios.post(`${serverURL}/api/users`, user)
  return response.data
})

export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
  const response = await axios.put(`${serverURL}/api/users/${user.id}`, user)
  return response.data
})

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId) => {
    await axios.delete(`${serverURL}/api/users/${userId}`)
    return userId
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false
        state.users.push(action.payload)
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        const updatedUser = action.payload
        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? { ...user, ...updatedUser } : user
        )
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        const userId = action.payload
        state.users = state.users.filter((user) => user._id !== userId)
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default usersSlice.reducer
