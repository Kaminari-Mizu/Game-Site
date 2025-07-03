import { LoginRequest, LoginResponse, RegisterResponse, User } from "../types/auth";

export const mockLogin = async (data: LoginRequest) : Promise<LoginResponse> => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
        throw new Error('No registered users found');
    }

    const users: User[] = JSON.parse(storedUser);
    const user = users.find(u => u.username === data.username);

    if (!user || data.password !== 'password123') {
        throw new Error('Invalid credentials');
    }

    return {
        token: `mock-jwt-token-${user.userId}`,
        user,
    };
};

export const mockRegister = async (data: LoginRequest) : Promise<RegisterResponse> => {
    const storedUser = localStorage.getItem('user');
    let users: User[] = storedUser ? JSON.parse(storedUser) : [];

    if (users.some(u => u.username === data.username)) {
        throw new Error('Username already exists');
    }

    const newUser: User = {
        userId: crypto.randomUUID(),
        username: data.username,
    };

    users = [...users, newUser];
    localStorage.setItem('user', JSON.stringify(users));

    return {
        message: 'Registration Successful',
        user: newUser,
    };
};