import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    //This name will be cresponds with the variable assigned in store.tsx
    //under the reducer object.
    name: "username", 
    initialState: {
        username: "",
        password: ""
    },
    reducers: {
        setUser(state: any, param:any){
            state.username = param.payload.username;
            state.password = param.payload.password;
        }
    }
});

//Used for the dispatcher
export const userActions = userSlice.actions;