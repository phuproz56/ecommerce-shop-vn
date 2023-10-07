import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import jwt from "jwt-decode";

export const add_friend = createAsyncThunk("chat/add_friend", async (info) => {
  try {
    const { data } = await api.post(
      "/chat/customer/add-customer-friend",
      info
    );
  } catch (error) {}
});

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    my_friends: [],
    fd_messages: [],
    currentFd: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {},
});

export const { messageClear } = chatReducer.actions;
export default chatReducer.reducer;
