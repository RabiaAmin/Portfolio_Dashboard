import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import forgotResetPassReducer from './slices/forgotResetPasswordSlice'
import skillReducer from './slices/skillSlice'
import projectReducer from './slices/projectSlice'
export const store = configureStore({
    reducer:{
        user: userReducer,
        forgotPassword: forgotResetPassReducer,
        skill:  skillReducer,
        project: projectReducer
    }
})