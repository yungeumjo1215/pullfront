import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { logout } from './redux/slices/userSlice';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
`;

const Header = styled.header`
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const NavList = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavItem = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.background};
  }
`;

const LogoutButton = styled.button`
  background-color: ${props => props.theme.colors.error};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`;

const MainContent = styled.main`
  min-height: calc(100vh - 60px);
`;

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useSelector(state => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Nav>
            <Logo to="/">꽃가게</Logo>
            <NavList>
              <NavItem to="/">홈</NavItem>
              <NavItem to="/shop">상품</NavItem>
              {isLoggedIn && <NavItem to="/cart">장바구니</NavItem>}
              {!isLoggedIn && (
                <>
                  <NavItem to="/login">로그인</NavItem>
                  <NavItem to="/register">회원가입</NavItem>
                </>
              )}
              {isAdmin && <NavItem to="/admin">관리자</NavItem>}
              {isLoggedIn && (
                <LogoutButton onClick={handleLogout}>
                  로그아웃
                </LogoutButton>
              )}
            </NavList>
          </Nav>
        </Header>

        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper; 