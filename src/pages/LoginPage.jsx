import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import api from '../services/api';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/userSlice';

const LoginContainer = styled.div`
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: ${props => props.theme.colors.background};
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
`;

const RegisterLink = styled(Link)`
  text-align: center;
  color: ${props => props.theme.colors.primary};
  margin-top: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      dispatch(loginStart());
      const response = await api.auth.login(formData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      dispatch(loginSuccess(user));
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.';
      setError(errorMessage);
      dispatch(loginFailure(errorMessage));
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>로그인</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">이메일</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit">로그인</Button>
          <RegisterLink to="/register">
            계정이 없으신가요? 회원가입
          </RegisterLink>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage; 