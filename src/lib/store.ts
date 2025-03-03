import { configureStore, combineReducers } from "@reduxjs/toolkit";
import mangementReducer from "./fetsures/management/slice";
import StudentReducer from "./fetsures/students/slice";
import homeReducer from "./fetsures/home/slice";
import reportsReducer from "./fetsures/reports/slice";
import landingReducer from "./fetsures/landing/slice";
import AuthReducer from './fetsures/auth/slice'

const rootReducer = combineReducers({
  mangement: mangementReducer,
  student: StudentReducer,
  home: homeReducer,
  reports: reportsReducer,
  landing: landingReducer,
  auth: AuthReducer
});
// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Export the store
export default store;
