export interface User {
    avatar: string;
    avatar_folder: string;
    created_at: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    password: string;
    premium: boolean;
    role: string;
    status: number;
    updated_at: string;
    username: string;
}

export interface GetUserResponse {
    user: User;
}

export interface UserUpdateData {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    premium: boolean;
    role: string;
}
