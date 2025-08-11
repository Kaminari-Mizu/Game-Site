import axios, {AxiosError} from 'axios';
import { LoginRequest, LoginResponse, RegisterResponse } from '../types/auth';

const API_BASE_URL = 'https://localhost:7000/api/auth';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_BASE_URL}/login`, data, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message || 'Login Failed');
        }
        throw new Error('An unexpected error occurred during login')
    }
};

export const register = async (data: LoginRequest): Promise<RegisterResponse> => {
    try {
        const response = await axios.post<RegisterResponse>(`${API_BASE_URL}/register`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }
    catch (error) {
        if(error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message || 'Registration Failed');
        }
        throw new Error('An unexpected error occurred during registration')
    }
}