import { configureStore, createSelector, ThunkAction, UnknownAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { userSlice } from './modules/users/users.slice';
import { counterReducer } from './modules/counters/counters.slice';
import { extraArgument } from './extra-argumetn';

// const reducer = (state = initalState, action:Action):State => {
//     return {
//         users: usersReducer(state.users, action),
//         counters: counterReducer(state.counters, action),
//     }
// }; 



export const store = configureStore({
  reducer: {
    counters : counterReducer,
    [userSlice.name] : userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument}}), 
});

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<R, AppState, typeof extraArgument, UnknownAction> 

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();


