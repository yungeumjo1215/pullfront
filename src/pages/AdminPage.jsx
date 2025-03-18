import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/userSlice';

const AdminContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  padding: 2rem;
`;

const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AdminTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin: 0;
`;

const LogoutButton = styled.button`
  background-color: ${props => props.theme.colors.error};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const DashboardCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin: 0 0 1rem 0;
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors.secondary};
  margin: 0;
`;

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const AdminSection = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin: 0 0 1rem 0;
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 1rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAdmin } = useSelector(state => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleContentManagement = (section) => {
    navigate(`/admin/${section}`);
  };

  if (!isAdmin) {
    navigate('/login');
    return null;
  }

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminTitle>관리자 대시보드</AdminTitle>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </AdminHeader>

      <DashboardGrid>
        <DashboardCard onClick={() => handleContentManagement('home')}>
          <CardIcon>🏠</CardIcon>
          <CardTitle>홈페이지 관리</CardTitle>
          <CardDescription>메인 이미지, 섹션별 콘텐츠 수정</CardDescription>
        </DashboardCard>

        <DashboardCard onClick={() => handleContentManagement('flower')}>
          <CardIcon>🌸</CardIcon>
          <CardTitle>Flower 관리</CardTitle>
          <CardDescription>꽃다발, 웨딩 장식, 화환 상품 관리</CardDescription>
        </DashboardCard>

        <DashboardCard onClick={() => handleContentManagement('plant')}>
          <CardIcon>🌿</CardIcon>
          <CardTitle>Plant 관리</CardTitle>
          <CardDescription>사무실 식물, 인테리어 식물 관리</CardDescription>
        </DashboardCard>

        <DashboardCard onClick={() => handleContentManagement('class')}>
          <CardIcon>📚</CardIcon>
          <CardTitle>Class 관리</CardTitle>
          <CardDescription>원데이 클래스, 정규 클래스 관리</CardDescription>
        </DashboardCard>
      </DashboardGrid>

      <AdminSection>
        <SectionTitle>주문 관리</SectionTitle>
        <Button onClick={() => handleContentManagement('orders')}>주문 목록</Button>
        <Button onClick={() => handleContentManagement('delivery')}>배송 관리</Button>
      </AdminSection>

      <AdminSection>
        <SectionTitle>회원 관리</SectionTitle>
        <Button onClick={() => handleContentManagement('users')}>회원 목록</Button>
        <Button onClick={() => handleContentManagement('reviews')}>리뷰 관리</Button>
      </AdminSection>

      <AdminSection>
        <SectionTitle>시스템 관리</SectionTitle>
        <Button onClick={() => handleContentManagement('settings')}>설정</Button>
        <Button onClick={() => handleContentManagement('statistics')}>통계</Button>
      </AdminSection>
    </AdminContainer>
  );
};

export default AdminPage; 