import { combineReducers } from "@reduxjs/toolkit";
import  UiReducer from './reducers/UiSlice'

const rootReducer = combineReducers ({
   Ui: UiReducer,
});

export default rootReducer;

