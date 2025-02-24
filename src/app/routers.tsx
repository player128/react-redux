import { createBrowserRouter, Link, Outlet, redirect } from "react-router-dom";
import { UsersList } from "../modules/users/users-list";
import { Counters } from "../modules/counters/counters";
import { UserInfo } from "../modules/users/user-info";
import { store } from "./store";

const loadStore = () => new Promise((resolve) => {
    setTimeout(() => resolve(store), 0);
});

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div className="flex flex-col items-center gap-5 py-5">
                <header className="py-5 flex gap-4">
                    <Link to="users">Users</Link> 
                    <Link to="counters">Counters</Link> 
                </header>
                <Outlet />
            </div>
        ),
        children: [
            {
                index: true,
                loader: () => redirect('/users'),
            },
            {
                path: "users",
                element: <UsersList />,
                loader: () => {
                    loadStore().then(() => {
                    });

                    return null;
                }
            },
            {
                path: "users/:id",
                element: <UserInfo />,
                loader: ({params}) => {
                    loadStore().then(() => {
                    });
                    return null;
                }
            },
            {
                path: "counters",
                element: <Counters />
            },

        ]
    },
]);