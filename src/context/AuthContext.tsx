import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {User} from '../types/auth';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token:string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if(storedUser) {
            const users: User[] = JSON.parse(storedUser);
            const currentUser = users.find(u => u.userId === localStorage.getItem('currentUserId'));
            if(currentUser) {
                setUser(currentUser);
            }
        }
    }, []);

    const login = (token: string, user: User) => {
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('currentUserId', user.userId);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('currentUserId');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};