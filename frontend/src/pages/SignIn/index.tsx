import React, { useCallback, useRef } from 'react';

import { FiLock, FiMail } from 'react-icons/fi';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FormLogin } from './styles';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

interface ILoginState {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn, user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);

  const handleSignIn = useCallback(
    async (data: ILoginState) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .required('Digite sua senha')
            .min(8, 'A senha deve ser entre 8 e 16 caractres')
            .max(16, 'A senha deve ser entre 8 e 16 caractres'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({ email: data.email, password: data.password });

        return navigate('/dashboard');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Error',
          description: 'Algo ocorreu ao entrar na sua conta',
          type: 'error',
        });
      }
    },
    [addToast, navigate, signIn],
  );

  return (
    <>
      {user && <Navigate to="/dashboard" replace />}
      <FormLogin ref={formRef} onSubmit={handleSignIn}>
        <h1>Log in</h1>
        <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />

        <Link id="forgot" to="/password/forgot">
          Esqueci minha senha
        </Link>

        <button type="submit">Entrar</button>

        <Link to="/signup">Não tem uma conta? Crie agora uma</Link>
      </FormLogin>
    </>
  );
};

export default SignIn;
