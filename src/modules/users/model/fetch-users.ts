import { userSlice } from "../users.slice";
import { AppThunk } from "../../../shared/redux";

export const fetchUsers = 
    ( { refetch }:{refetch?: boolean} = {}):AppThunk<Promise<void>> => 
        async (dispatch, getState, { api }) => {
            const isIdle = userSlice.selectors.selectIsFetchUsersIdle(getState()); 
            if (!isIdle && !refetch) return;
            
            dispatch(userSlice.actions.fetchUsersPending());
            return api
                .getUsers()
                .then((users) => {
                    dispatch(userSlice.actions.fetchUsersSuccess({users}));
                })
                .catch(() => {
                    dispatch(userSlice.actions.fetchUsersFailed());
                });
        }