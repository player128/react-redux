import { memo, useEffect, useState } from "react";
import { useAppDispatch,  useAppSelector, useAppStore} from '../../store';
import { UserId, userSlice } from './users.slice';
import { fetchUsers } from "./model/fetch-users";

export function UsersList() {
    const dispatch = useAppDispatch();
    const appStore = useAppStore();
    const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');
    const sortedUsers = useAppSelector((state) => userSlice.selectors.selectSortedUsers(state, sortType));
    const selectedUserId = useAppSelector(userSlice.selectors.selectSelectedUserId);
    const isPending = useAppSelector(userSlice.selectors.selectIsFetchUsersPending);

    useEffect(() => { 
        dispatch(fetchUsers)
    }, [dispatch, appStore]);

    if (isPending) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col items-center">
            {!selectedUserId ? (
                <div className="flex flex-col items-center justify-between">
                    <div className="flex flex-row items-center">
                        <button
                            onClick={() => setSortType("asc")}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Asc
                        </button>
                        <button
                            onClick={() => setSortType("desc")}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Desc
                        </button>
                    </div>
                    <ul className="list-none">
                        {sortedUsers.map((user) => (
                            <UserListItem
                                userId={user.id}
                                key={user.id}
                            />
                        ))}
                    </ul>
                </div>
            ) : (
                <SelectedUser
                    userId={selectedUserId}
                />
            )}
        </div>
    );
}

const UserListItem = memo(function({ userId }: { userId:UserId }) { 
    console.log('render userId', userId);
    const user = useAppSelector((state) => state.users.entities[userId]);

    const dispatch = useAppDispatch();
    const handleUserClick = () => {
        dispatch(userSlice.actions.selected({ userId }));
    }

    return (
        <li key={user.id} className="py-2" onClick={handleUserClick}>
            <span className="hover:underline cursor-pointer">{user.name}</span>
        </li>
    );
})

function SelectedUser({ userId }: { userId:UserId }) {
    const user = useAppSelector((state) => state.users.entities[userId]);
    const dispatch = useAppDispatch();
    const handleBackButtonClick = () => {
        dispatch(userSlice.actions.selectRemove());
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleBackButtonClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
            >
                Back
            </button>
            <h2 className="text-3xl">{user.name}</h2>
            <p className="text-xl">{user.description}</p>
        </div>
    );
}