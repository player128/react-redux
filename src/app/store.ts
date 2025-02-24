import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from '../modules/counters/counters.slice';
import { router } from "./routers";
import { baseApi } from "../shared/api";

export const extraArgument = {
    router,
};

// const reducer = (state = initalState, action:Action):State => {
//     return {
//         users: usersReducer(state.users, action),
//         counters: counterReducer(state.counters, action),
//     }
// }; 

export const store = configureStore({
  reducer: {
    counters : counterReducer,
    [baseApi.reducerPath] : baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument}}).concat(
    baseApi.middleware
  ), 
});