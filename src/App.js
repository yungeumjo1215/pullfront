import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from './components/user/LoginPage';
import RegisterPage from './components/user/RegisterPage';
import AdminPage from './components/admin/AdminPage';
import { clearUser } from './redux/userSlice';

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            {!isLoggedIn ? (
              <>
                <li><Link to="/login">로그인</Link></li>
                <li><Link to="/register">회원가입</Link></li>
              </>
            ) : (
              <>
                {isAdmin && <li><Link to="/admin">관리자 페이지</Link></li>}
                <li><button onClick={handleLogout}>로그아웃</button></li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<h1>홈페이지</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 