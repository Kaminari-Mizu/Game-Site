export interface LoginRequest {
    username: string;
    password: string;
}

export interface User {
    userId: string;
    userName: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface RegisterResponse {
    message: string;
    user: User;
}