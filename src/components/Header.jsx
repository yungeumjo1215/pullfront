import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/userSlice';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.lightBackground};
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

const CartButton = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const CartCount = styled.span`
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
`;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useSelector(state => state.user || {});

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">PULL</Logo>
        <NavLinks>
          <NavLink to="/flower">Flower</NavLink>
          <NavLink to="/plant">Plant</NavLink>
          <NavLink to="/class">Class</NavLink>
          <CartButton to="/cart">
            장바구니
            <CartCount>0</CartCount>
          </CartButton>
          {isLoggedIn ? (
            <>
              {isAdmin && (
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