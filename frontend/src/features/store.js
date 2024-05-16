import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";

/**
 * redux store 
 */
export const store=configureStore({
    reducer:{
        mainSlice
    }
})