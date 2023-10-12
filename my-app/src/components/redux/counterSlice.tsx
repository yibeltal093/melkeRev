import { createSlice } from '@reduxjs/toolkit';

// function counterSlice() {
//   return (
//     <div>counterSlice</div>
//   )
// }

export const counterSlice = createSlice({
    name: "counter",
    initialState: {value: 0},
    reducers: {
        //action
        increament(state){
            state.value++;
        },
        decreament(state){
            state.value--;
        }
    }
})

export const counterActions = counterSlice.actions;

//Sclices are where you define the initial state and the actions you can apply
//to that state