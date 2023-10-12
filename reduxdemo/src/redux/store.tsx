import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slices/userSlice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
});
export default store; //this will go to the index.tsx and wroped arround app.tsx

//For more information: Search [redux Thunk]