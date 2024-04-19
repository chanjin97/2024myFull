import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const loginUser = createAsyncThunk("user/loginUser", async (body) => {
  try {
    const res = await axiosInstance.post("/user/login", body);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const authUser = createAsyncThunk("user/authUser", async (_) => {
  try {
    const response = await axiosInstance.get(`/user/auth`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const logoutUser = createAsyncThunk("user/logoutUser", async (_) => {
  try {
    const response = await axiosInstance.post(`/user/logout`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// 선생님이 주신 코드

// export const loginUser = createAsyncThunk('user/loginUser', async (body, thunkAPI) => {
//   try {
//     const response = await axiosInstance.post(/user/login, body)
//     console.log('thunkapi 로그인')
//     return response.data
//   } catch (error) {
//     console.log(error)
//     return thunkAPI.rejectWithValue(error.response.data || error.message)
//   }
// })
