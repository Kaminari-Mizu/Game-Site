import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData, registerSchema } from '../utils/loginValidation';
import { mockRegister } from '../api/mockAuth';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput, Paper, Title, Text, Anchor, Notification } from '@mantine/core';
import { IconX, IconCheck } from '@tabler/icons-react';

const RegisterForm: React.FC = () => {
 const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await mockRegister({ username: data.username, password: data.password });
      setSuccess(response.message);
      setError(null);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setSuccess(null);
    }
  };

  return (
    <Paper shadow="md" p="lg" withBorder style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}>
      <Title order={2} ta="center" mb="md">Register</Title>
      {error && (
        <Notification icon={<IconX size={18} />} color="red" onClose={() => setError(null)} mb="md">
          {error}
        </Notification>
      )}
      {success && (
        <Notification icon={<IconCheck size={18} />} color="green" onClose={() => setSuccess(null)} mb="md">
          {success}
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
        <TextInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          mb="md"
        />
        <Button type="submit" fullWidth loading={isSubmitting} mb="md">
          Register
        </Button>
      </form>
      <Text ta="center" size="sm">
        Already have an account?{' '}
        <Anchor component="a" href="/login">
          Login
        </Anchor>
      </Text>
    </Paper>
  );
};

export default RegisterForm;