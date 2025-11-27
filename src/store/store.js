import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import AdminProductSlice from './admin-store/Product-slice/index'

const store = configureStore({
    reducer :{
        auth: authReducer,
        adminProducts:   AdminProductSlice,
    },
});

export default store;