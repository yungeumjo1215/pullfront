import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logout } from './store/slices/userSlice';
import GlobalStyle from './styles/GlobalStyle';
import DropdownMenu from './components/common/DropdownMenu';
import Footer from './components/common/Footer';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './store';
import theme from './theme';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
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

const MainContent = styled.main`
  flex: 1;
  margin-top: 80px;
  padding: 20px;
  min-height: calc(100vh - 60px);
  max-width: 1200px;
  width: 100%;
  margin: 80px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const AppContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useSelector(state => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          
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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App; 