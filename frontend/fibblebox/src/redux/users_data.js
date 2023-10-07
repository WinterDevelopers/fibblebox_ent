import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userState:false,
    name:null,
    email:null,
    status:null
}

const userStatusSlice = createSlice({
    name:"userData",
    initialState,
    reducers:{
        setUserData:(state, action)=>{
            state.userState = true;
            if(action.payload !== null && action.payload!==undefined){
                state.name = action.payload.name;
                state.email = action.payload.email;
                state.status = action.payload.status
            };
        },
        clearUserData:(state)=>{
            state.userState = false;
            state.name = null;
            state.email = null;
            state.status = null;
        },
    }
})

export const { setUserData, clearUserData } = userStatusSlice.actions;
export default userStatusSlice.reducer;