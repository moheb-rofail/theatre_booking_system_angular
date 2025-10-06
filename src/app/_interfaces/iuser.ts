export interface IUser {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
}

export interface LoginResponse {
    user: IUser;
    token: string;
}