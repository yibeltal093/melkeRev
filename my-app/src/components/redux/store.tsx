/**
 * What is Redux?
 * --Redux is a dependancy that holds the global appliction state
 * --Since React is unidirectional:- Meaning the components start from the parents
 *          and goes all the way down to the child, Having a global state can 
 *          be beneficial
 * 
 * How it works?
 * --There is a centeral store somewhere that holds the global appliction state
 * --Views can dispatch an action to the store to manipulate the state
 * --When the state gets manipulated, the view will be automatically update.
 * 
 * What is a view?
 * --The components
 * 
 * What is an Action?
 * --Functions that were predefined to manipulate the state
 * 
 * What is a dipatcher?
 * --Delivers the action to tthe store
 * --We need to dispatch the action to the store so that it can be manipulated
 * 
 * 
 * TO INSTALL: ====> [npm install redux react-redux @reduxjs/toolkit]
 * 
 *=>To the index.tsx wrop <provider><App/></provider>
 */

import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./counterSlice";

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
});

export default store;