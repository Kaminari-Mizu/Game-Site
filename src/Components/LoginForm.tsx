import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '../utils/loginValidation';
import { mockLogin } from '../api/mockAuth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput, Paper, Title, Text, Anchor, Notification } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

const LoginForm: React.FC = () => {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await mockLogin(data);
      authLogin(response.token, response.user);
      setError(null);
      navigate('/');
    } catch (err: any) {
       const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'; 
      setError(errorMessage);
    }
  };

  return (
    <Paper shadow="md" p="lg" withBorder style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}>
      <Title order={2} ta="center" mb="md">Login</Title>
      {error && (
        <Notification icon={<IconX size={18} />} color="red" onClose={() => setError(null)} mb="md">
          {error}
        </Notification>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Username"
          placeholder="Enter your username"
          {...register('username')}
          error={errors.username?.message}
          mb="md"
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
          error={errors.password?.message}
          mb="md"
        />
        <Button type="submit" fullWidth loading={isSubmitting} mb="md">
          Login
        </Button>
      </form>
      <Text ta="center" size="sm">
        Don’t have an account?{' '}
        <Anchor component="a" href="/register">
          Register
        </Anchor>
      </Text>
    </Paper>
  );
};

export default LoginForm;