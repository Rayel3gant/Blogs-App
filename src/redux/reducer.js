import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice"

const rootReducer=combineReducers({
    profile:profileReducer
})

export default rootReducer