import { configureStore, createSelector } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { initialUsersList, userSlice } from './modules/users/users.slice';
import { counterReducer } from './modules/counters/counters.slice';

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
});

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();

store.dispatch(userSlice.actions.stored({ users : initialUsersList }));


