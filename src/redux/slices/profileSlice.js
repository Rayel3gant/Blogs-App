import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
};
const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser( state,value){
            state.user=value.payload
        },
        setToken(state, value) {
            state.token = value.payload;
        },
    }
})
export const { setUser , setToken}=profileSlice.actions;
export default profileSlice.reducer;

