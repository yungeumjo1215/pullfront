import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin: 0;
`;

const BackButton = styled.button`
  background-color: ${props => props.theme.colors.secondary};
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 500;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Tr = styled.tr`
  &:hover {
    background-color: ${props => props.theme.colors.background};
  }
`;

const ActionButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  margin-bottom: 1rem;
  width: 200px;
`;

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await api.admin.getUsers();
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load users:', error);
      setLoading(false);
    }
  };

  const handleViewDetails = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      try {
        await api.admin.deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
        alert('사용자가 성공적으로 삭제되었습니다.');
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('사용자 삭제에 실패했습니다.');
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      <Header>
        <Title>회원 관리</Title>
        <BackButton onClick={() => navigate('/admin')}>돌아가기</BackButton>
      </Header>

      <SearchInput
        type="text"
        placeholder="이름 또는 이메일로 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Table>
        <thead>
          <tr>
            <Th>이름</Th>
            <Th>이메일</Th>
            <Th>가입일</Th>
            <Th>주문 수</Th>
            <Th>관리</Th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{new Date(user.joinDate).toLocaleDateString()}</Td>
              <Td>{user.orderCount}</Td>
              <Td>
                <ActionButton onClick={() => handleViewDetails(user.id)}>
                  상세보기
                </ActionButton>
                <ActionButton
                  onClick={() => handleDeleteUser(user.id)}
                  style={{ backgroundColor: '#dc3545' }}
                >
                  삭제
                </ActionButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserManagement; 