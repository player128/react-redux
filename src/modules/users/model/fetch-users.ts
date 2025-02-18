import { userSlice } from "../users.slice";
import { AppThunk } from "../../../store";

export const fetchUsers = ():AppThunk => (dispatch, getState, { api }) => {
    const isIdle = userSlice.selectors.selectIsFetchUsersIdle(getState()); 
    if (!isIdle) return;
    
    dispatch(userSlice.actions.fetchUsersPending());
    api
        .getUsers()
        .then((users) => {
            dispatch(userSlice.actions.fetchUsersSuccess({users}));
        })
        .catch(() => {
            dispatch(userSlice.actions.fetchUsersFailed());
        });
}