import { UserId, userSlice } from "../users.slice";
import { AppThunk } from "../../../store";
import { fetchUsers } from "./fetch-users";

export const deleteUser = 
    (userId: UserId):AppThunk<Promise<void>> => 
        async (dispatch, _, { api, router }) => {
            dispatch(userSlice.actions.deleteUserPending());
            try {
                await api.deleteUser(userId);
                await router.navigate("/users");
                await dispatch(fetchUsers({ refetch: true }));
                dispatch(userSlice.actions.deleteUserSuccess({ userId }));
            } catch  {
                dispatch(userSlice.actions.deleteUserFailed());
            }
        };