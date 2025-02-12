import { combineReducers, configureStore, createSelector } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { initialUsersList, usersReducer, UsersStoredAction } from './modules/users/users.slice';
import { counterReducer } from './modules/counters/counters.slice';

// const reducer = (state = initalState, action:Action):State => {
//     return {
//         users: usersReducer(state.users, action),
//         counters: counterReducer(state.counters, action),
//     }
// }; 

const reducer = combineReducers({
    users : usersReducer, 
    counters : counterReducer,
});

export const store = configureStore({
  reducer: reducer,
});

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();

store.dispatch({
    type: "usersStored",
    payload: {users : initialUsersList},
} satisfies UsersStoredAction)


