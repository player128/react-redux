import { createAppAsyncThunk } from "../../../shared/redux";
import { userSlice } from "../users.slice";

export const fetchUsers = createAppAsyncThunk(
    "users/fetchUsers", 
    async (_?:{refetch?: boolean} = {}, thunkAPI) => 
        thunkAPI.extra.api.getUsers(), 
    {
        condition(params, { getState }) {
            const isIdle = userSlice.selectors.selectIsFetchUsersIdle(getState());

            if (!params?.refetch && !isIdle) {
                return false;
            }

            return true;
        },
    },
);