import React from 'react';
import styled from 'styled-components';

const AdminContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const AdminPage = () => {
  return (
    <AdminContainer>
      <h2>관리자 페이지</h2>
      <p>관리자 기능은 추후 구현될 예정입니다.</p>
    </AdminContainer>
  );
};

export default AdminPage; 