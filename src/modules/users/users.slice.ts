export type UserId = string;

export  type User = {
    id: UserId;
    name: string;
    description: string;
};

// type UsersState = {
//     entities: Record<UserId, User | undefined>;
//     ids: UserId[]; // дефолтный список, который пришел с бека(порядок элементов)
//     fetchUsersStatus: "idle" | "pending" | "success" | "failed";
//     fetchUserStatus: "idle" | "pending" | "success" | "failed";
//     deleteUserStatus: "idle" | "pending" | "success" | "failed";
// }
