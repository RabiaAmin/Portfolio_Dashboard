import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import forgotResetPassReducer from './slices/forgotResetPasswordSlice'
import skillReducer from './slices/skillSlice'
export const store = configureStore({
    reducer:{
        user: userReducer,
        forgotPassword: forgotResetPassReducer,
        skill:  skillReducer
    }
})