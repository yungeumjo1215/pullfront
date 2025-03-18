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

const StatusSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  font-size: 0.9rem;
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

const OrderManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await api.admin.getOrders();
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load orders:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.admin.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      alert('주문 상태가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('주문 상태 업데이트에 실패했습니다.');
    }
  };

  const handleViewDetails = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      <Header>
        <Title>주문 관리</Title>
        <BackButton onClick={() => navigate('/admin')}>돌아가기</BackButton>
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>주문 번호</Th>
            <Th>주문자</Th>
            <Th>상품</Th>
            <Th>금액</Th>
            <Th>주문일</Th>
            <Th>상태</Th>
            <Th>관리</Th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <Tr key={order.id}>
              <Td>{order.orderNumber}</Td>
              <Td>{order.customerName}</Td>
              <Td>{order.productName}</Td>
              <Td>{order.totalAmount.toLocaleString()}원</Td>
              <Td>{new Date(order.orderDate).toLocaleDateString()}</Td>
              <Td>
                <StatusSelect
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="pending">주문 대기</option>
                  <option value="processing">처리 중</option>
                  <option value="shipped">배송 중</option>
                  <option value="delivered">배송 완료</option>
                  <option value="cancelled">취소됨</option>
                </StatusSelect>
              </Td>
              <Td>
                <ActionButton onClick={() => handleViewDetails(order.id)}>
                  상세보기
                </ActionButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrderManagement; 