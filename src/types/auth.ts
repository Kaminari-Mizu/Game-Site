export interface LoginRequest {
    username: string;
    password: string;
}

export interface User {
    userId: string;
    username: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface RegisterResponse {
    message: string;
    user: User;
}