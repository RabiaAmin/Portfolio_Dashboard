import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"


const userSllice = createSlice({
    name:"user",
    initialState:{
        loading:false,
        user:{},
        isAuthenticated: false,
        error:null,
        message:null,
        isUpadated: false,
    },
    reducers: {
    loginRequest(state){
        state.loading = true;
        state.isAuthenticated = false;
        state.user= {};
        state.error= null
    },
    loginSuccess(state,action){
        state.loading = false;
        state.isAuthenticated = true;
        state.user=  action.payload;
        state.error= null
    },
    loginFail(state,action){
        state.loading = false;
        state.isAuthenticated = false;
        state.user= {};
        state.error= action.payload;
    },
    clearAllErrors(state){
        state.error = null;
        
       
    }
    }
});



export const login = (email,password)=> async (dispatch)=>{
        dispatch(userSllice.actions.loginRequest());
    try {
     const data = await axios.post("http://localhost:3000/api/v1/user/login",{email,password},{withCredentials:true,headers: {"Content-Type":"application/json"}});
     dispatch(userSllice.actions.loginSuccess(data.data.user));
     dispatch(userSllice.actions.clearAllErrors());
    } catch (error) {
       dispatch(userSllice.actions.loginFail(error.response.data.message));
    }
   
}

export const clearAllUserErrors = ()=>(dispatch)=>{
    dispatch(userSllice.actions.clearAllErrors());
}

export default userSllice.reducer;