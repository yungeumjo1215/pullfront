import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logout } from './store/slices/userSlice';
import GlobalStyle from './styles/GlobalStyle';
import DropdownMenu from './components/common/DropdownMenu';
import Footer from './components/common/Footer';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import BouquetPage from './pages/flower/BouquetPage';
import PlantPage from './pages/plant/PlantPage';
import ClassPage from './pages/class/ClassPage';
import FlowerMainPage from './pages/flower/FlowerMainPage';
import PlantMainPage from './pages/plant/PlantMainPage';
import ClassMainPage from './pages/class/ClassMainPage';
import HomeManagement from './pages/admin/HomeManagement';
import FlowerManagement from './pages/admin/FlowerManagement';
import PlantManagement from './pages/admin/PlantManagement';
import ClassManagement from './pages/admin/ClassManagement';
import OrderManagement from './pages/admin/OrderManagement';
import UserManagement from './pages/admin/UserManagement';
import SettingsManagement from './pages/admin/SettingsManagement';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
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

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavList = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.colors.white};
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
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

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 0.8rem;
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

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

const HamburgerIcon = styled.div`
  width: 24px;
  height: 2px;
  background-color: ${props => props.theme.colors.primary};
  position: relative;
  transition: all 0.3s;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
    transition: all 0.3s;
  }

  &::before {
    top: -8px;
  }

  &::after {
    bottom: -8px;
  }

  ${props => props.isOpen && `
    background-color: transparent;

    &::before {
      transform: rotate(45deg);
      top: 0;
    }

    &::after {
      transform: rotate(-45deg);
      bottom: 0;
    }
  `}
`;

const MainContent = styled.main`
  flex: 1;
  min-height: calc(100vh - 60px);
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const AppContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useSelector(state => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const flowerItems = [
    {
      title: '꽃다발',
      items: [
        { title: '일반 꽃다발', path: '/flower/bouquet' },
        { title: '웨딩 부케', path: '/flower/wedding-bouquet' },
        { title: '축하 꽃다발', path: '/flower/congratulation-bouquet' }
      ]
    },
    {
      title: '웨딩 장식',
      items: [
        { title: '포토 테이블', path: '/flower/photo-table' },
        { title: '아치', path: '/flower/arch' },
        { title: '웨딩 장식', path: '/flower/wedding-decoration' }
      ]
    },
    {
      title: '화환',
      items: [
        { title: '웨딩 화환', path: '/flower/wedding-wreath' },
        { title: '조화 화환', path: '/flower/artificial-wreath' },
        { title: '조문 화환', path: '/flower/condolence-wreath' }
      ]
    }
  ];

  const plantItems = [
    {
      title: '식물',
      items: [
        { title: '사무실 식물', path: '/plant/office' },
        { title: '인테리어 식물', path: '/plant/interior' },
        { title: '화분 식물', path: '/plant/potted' }
      ]
    },
    {
      title: '화분 & 가이드',
      items: [
        { title: '화분', path: '/plant/pots' },
        { title: '식물 가이드', path: '/plant/guide' },
        { title: '식물 용품', path: '/plant/supplies' }
      ]
    }
  ];

  const classItems = [
    {
      title: '원데이 클래스',
      items: [
        { title: '테라리움', path: '/class/terrarium' },
        { title: '모스볼', path: '/class/moss-ball' },
        { title: '플로리스트', path: '/class/florist' }
      ]
    },
    {
      title: '정규 클래스',
      items: [
        { title: '가드닝 클래스', path: '/class/gardening' },
        { title: '플로리스트 클래스', path: '/class/florist-course' },
        { title: '테라리움 클래스', path: '/class/terrarium-course' }
      ]
    },
    {
      title: '강의',
      items: [
        { title: '강의 신청', path: '/class/lecture-request' },
        { title: '강의 일정', path: '/class/lecture-schedule' },
        { title: '강의 후기', path: '/class/lecture-reviews' }
      ]
    }
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <AppContainer>
      <Header>
        <Nav>
          <Logo to="/">
            <span>PULL</span>
          </Logo>
          <HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <HamburgerIcon isOpen={isMenuOpen} />
          </HamburgerButton>
          <NavList isOpen={isMenuOpen}>
            <NavItem to="/flower">Flower</NavItem>
            <NavItem to="/plant">Plant</NavItem>
            <NavItem to="/class">Class</NavItem>
            {isLoggedIn ? (
              <>
                {isAdmin && <NavItem to="/admin">관리자 페이지</NavItem>}
                <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
              </>
            ) : (
              <>
                <NavItem to="/login">로그인</NavItem>
                <NavItem to="/register">회원가입</NavItem>
              </>
            )}
          </NavList>
        </Nav>
      </Header>

      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/home" element={<HomeManagement />} />
          <Route path="/admin/flower" element={<FlowerManagement />} />
          <Route path="/admin/plant" element={<PlantManagement />} />
          <Route path="/admin/class" element={<ClassManagement />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/settings" element={<SettingsManagement />} />

          {/* Flower Routes */}
          <Route path="/flower" element={<FlowerMainPage />} />
          <Route path="/flower/bouquet" element={<BouquetPage />} />
          <Route path="/flower/wedding-bouquet" element={<BouquetPage />} />
          <Route path="/flower/congratulation-bouquet" element={<BouquetPage />} />
          <Route path="/flower/photo-table" element={<BouquetPage />} />
          <Route path="/flower/arch" element={<BouquetPage />} />
          <Route path="/flower/wedding-decoration" element={<BouquetPage />} />
          <Route path="/flower/wedding-wreath" element={<BouquetPage />} />
          <Route path="/flower/artificial-wreath" element={<BouquetPage />} />
          <Route path="/flower/condolence-wreath" element={<BouquetPage />} />

          {/* Plant Routes */}
          <Route path="/plant" element={<PlantMainPage />} />
          <Route path="/plant/office" element={<PlantPage />} />
          <Route path="/plant/interior" element={<PlantPage />} />
          <Route path="/plant/potted" element={<PlantPage />} />
          <Route path="/plant/pots" element={<PlantPage />} />
          <Route path="/plant/guide" element={<PlantPage />} />
          <Route path="/plant/supplies" element={<PlantPage />} />

          {/* Class Routes */}
          <Route path="/class" element={<ClassMainPage />} />
          <Route path="/class/terrarium" element={<ClassPage />} />
          <Route path="/class/flower-arrangement" element={<ClassPage />} />
          <Route path="/class/plant-care" element={<ClassPage />} />
          <Route path="/class/regular" element={<ClassPage />} />
          <Route path="/class/lecture" element={<ClassPage />} />
        </Routes>
      </MainContent>

      <Footer />
    </AppContainer>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App; 