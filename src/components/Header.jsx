import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.white};
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const AdminButton = styled(Button)`
  background-color: ${props => props.theme.colors.secondary};
`;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">PULL</Logo>
        <NavLinks>
          <NavLink to="/flower">Flower</NavLink>
          <NavLink to="/plant">Plant</NavLink>
          <NavLink to="/class">Class</NavLink>
          {isAuthenticated ? (
            <>
              {user?.isAdmin && (
                <AdminButton onClick={() => navigate('/admin')}>
                  관리자 페이지
                </AdminButton>
              )}
              <Button onClick={handleLogout}>로그아웃</Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate('/login')}>로그인</Button>
              <Button onClick={() => navigate('/register')}>회원가입</Button>
            </>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 