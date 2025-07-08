import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '../utils/loginValidation';
import { mockLogin } from '../api/mockAuth';
import { useAuth } from '../context/AuthContext';
import { Button, TextInput, Paper, Title, Text, Anchor, Notification } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

interface LoginFormProps {
  closeModal: () => void;
  openRegisterModal?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ closeModal, openRegisterModal }) => {
  const { login: authLogin } = useAuth();
  const [error, setError] = React.useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await mockLogin(data);
      authLogin(response.token, response.user);
      setError(null);
      closeModal();
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    }
  };

  return (
    <Paper shadow="md" p="lg" withBorder style={{ maxWidth: 400, backgroundColor: '#1d1e30' }}>
      <Title order={2} ta="center" mb="md" c="seaGreen.0" style={{ fontFamily: "'Yuji Syuku', sans-serif" }}>
        Login
      </Title>
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
          c="gray.2"
          styles={{
            label: { color: '#d5d7e0' },
            input: { backgroundColor: '#2b2c3d', color: '#d5d7e0', borderColor: '#4d4f66' },
            error: { color: '#ff6b6b' }, // High-contrast error color
          }}
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
          error={errors.password?.message}
          mb="md"
          c="gray.2"
          styles={{
            label: { color: '#d5d7e0' },
            input: { backgroundColor: '#2b2c3d', color: '#d5d7e0', borderColor: '#4d4f66' },
            error: { color: '#ff6b6b' },
          }}
        />
        <Button type="submit" fullWidth loading={isSubmitting} mb="md" color="seaGreen.0">
          Login
        </Button>
      </form>
      <Text ta="center" size="sm" c="gray.2">
        Don’t have an account?{' '}
        <Anchor
          component="button"
          c="seaGreen.0"
          onClick={() => {
            closeModal();
            if (openRegisterModal) openRegisterModal();
          }}
        >
          Register
        </Anchor>
      </Text>
    </Paper>
  );
};

export default LoginForm;