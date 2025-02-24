import { useNavigate, useParams } from 'react-router-dom';
import { UserId } from './users.slice';
import { usersApi } from './api';
import { skipToken } from '@reduxjs/toolkit/query';

export function UserInfo() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: UserId }>();
    const {data: user, isLoading: isLoadingUser } = usersApi.useGetUserQuery(id ?? skipToken);
    const [deleteUser, { isLoading: isLoadingDelete }] = usersApi.useDeleteUserMutation();

    const handleBackButtonClick = () => {
        navigate("..", {relative: "path"});
    };

    const handleDeleteButtonClick = () => {
        if (!id)  return;
        deleteUser(id);
    };

    if (isLoadingUser || !user) {
        return <div>Loading...</div>;
    }

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
            <button 
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded md'
                onClick={handleDeleteButtonClick}
                disabled={isLoadingDelete}
            >
                Delete
            </button>
        </div>
    );
}