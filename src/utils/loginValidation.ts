import {z} from 'zod';

export const loginSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters').max(50, 'Username must be less than 50 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(50, 'Password must be less than 100 characters'),
})

export const registerSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters').max(50, 'Username must be less than 50 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(50, 'Password must be less than 100 characters'),
    confirmPassword: z.string().min(6, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;