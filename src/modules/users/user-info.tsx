import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store'; 
import { UserId, userSlice } from './users.slice';
import { useEffect } from 'react';
import { fetchUser } from './model/fetch-user';
import { deleteUser } from './model/delete-user';

export function UserInfo() {
    const navigate = useNavigate();
    const { id = '' } = useParams<{ id: UserId }>();
    const isPending = useAppSelector(userSlice.selectors.selectIsFetchUserPending);
    const isDeletePending = useAppSelector(userSlice.selectors.selectIsDeleteUserPending);
    const user = useAppSelector((state) => userSlice.selectors.selectUserById(state, id));
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchUser(id));
    }, [dispatch, id]);

    const handleBackButtonClick = () => {
        navigate("..", {relative: "path"});
    };

    const handleDeleteButtonClick = () => {
       dispatch(deleteUser(id));
    };

    if (isPending || !user) {
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
                disabled={isDeletePending}
            >
                Delete
            </button>
        </div>
    );
}