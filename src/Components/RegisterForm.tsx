import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData, registerSchema } from '../utils/loginValidation';
import { mockRegister } from '../api/mockAuth';
import { Button, TextInput, Paper, Title, Text, Anchor, Notification } from '@mantine/core';
import { IconX, IconCheck } from '@tabler/icons-react';

interface RegisterFormProps {
  closeModal: () => void;
  openLoginModal?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ closeModal, openLoginModal}) => {
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
      setTimeout(() => {
        closeModal();
        if(openLoginModal) openLoginModal();
      }, 2000);
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setSuccess(null);
    }
  };

  return (
<Paper shadow="md" p="lg" withBorder style={{ maxWidth: 400, backgroundColor: '#1d1e30' }}>
      <Title order={2} ta="center" mb="md" c="seaGreen.0" style={{ fontFamily: "'Yuji Syuku', sans-serif" }}>
        Register
      </Title>
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
          c="gray.2"
          styles={{
            label: { color: '#d5d7e0' },
            input: { backgroundColor: '#2b2c3d', color: '#d5d7e0', borderColor: '#4d4f66' },
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
          }}
        />
        <TextInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          mb="md"
          c="gray.2"
          styles={{
            label: { color: '#d5d7e0' },
            input: { backgroundColor: '#2b2c3d', color: '#d5d7e0', borderColor: '#4d4f66' },
          }}
        />
        <Button type="submit" fullWidth loading={isSubmitting} mb="md" color="seaGreen.0">
          Register
        </Button>
      </form>
      <Text ta="center" size="sm" c="gray.2">
        Already have an account?{' '}
        <Anchor
          component="button"
          c="seaGreen.0"
          onClick={() => {
            closeModal();
            if (openLoginModal) openLoginModal();
          }}
        >
          Login
        </Anchor>
      </Text>
    </Paper>
  );
};

export default RegisterForm;