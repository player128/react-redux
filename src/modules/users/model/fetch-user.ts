import { UserId, userSlice } from "../users.slice";
import { AppThunk } from "../../../store";

export const fetchUser = (userId: UserId):AppThunk => (dispatch, getState, { api }) => {
    const isPending = userSlice.selectors.selectIsFetchUserPending(getState()); 
    if (!isPending) return; // если статус не пединг, т.к проверку на idle нельзя делать, т.к больше не будет idle

    dispatch(userSlice.actions.fetchUserPending());
    api
        .getUser(userId)
        .then((user) => {
            dispatch(userSlice.actions.fetchUserSuccess({user}));
        })
        .catch(() => {
            dispatch(userSlice.actions.fetchUserFailed());
        });
}