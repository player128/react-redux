import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../store';

export type UserId = string;

export  type User = {
    id: UserId;
    name: string;
    description: string;
};

export const initialUsersList: User[] = Array.from({length: 3000}, (_, index) => ({
    id: `user${index + 11}`,
    name: `User ${index + 11}`,
    description: `Description for User ${index + 11}`,
}));

type UsersState = {
    entities: Record<UserId, User>;
    ids: UserId[]; // дефолтный список, который пришел с бека(порядок элементов)
    selectedUserId: UserId | undefined;
}

export type UserSelectedAction = {
    type: "userSelected";
    payload: {
        userId : UserId;
    }
};

export type UserRemoveSelected = {
    type: "userRemoveSelected";
}

export type UsersStoredAction = {
    type: "usersStored";
    payload: {
        users: User[];
    }
}

type Action = 
    | UserSelectedAction 
    | UserRemoveSelected 
    | UsersStoredAction;

const initialUserState: UsersState = {
    entities: {},
    ids: [],
    selectedUserId: undefined,
};    

export const usersReducer = (state = initialUserState, action: Action): UsersState => {
    switch(action.type) {
        case "usersStored" : {
            const {users} = action.payload;
            return{
                ...state,
                entities: users.reduce((acc, user) => {
                        acc[user.id] = user;
                        return acc;
                    }, {} as Record<UserId, User>),
                ids: users.map((user) => user.id)
            };
        }
        case "userSelected" : {
            const { userId } = action.payload;

            return {
                ...state,
                selectedUserId: userId,
            };
        }
        case "userRemoveSelected" : {
            return {
                ...state,
                selectedUserId: undefined,
            }
        }
        default :
         return state;
    }
}

export const selectSortedUsers = createSelector(
    (state : AppState) => state.users.ids,
    (state : AppState) => state.users.entities,
    (_ : AppState, sort: "asc" | "desc") => sort,
    (ids, entities, sort) =>      
    ids
        .map(id => entities[id])
        .sort((a, b) => {
            if (sort  === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        })
);

export const selectSelectedUserId = (state: AppState) => state.users.selectedUserId