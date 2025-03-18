import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { setCartItems, removeItem, updateQuantity, clearCart } from '../redux/slices/cartSlice';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CartTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  font-size: ${props => props.theme.typography.fontSize['2xl']};
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.base};

  h3 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
    font-size: ${props => props.theme.typography.fontSize.xl};
  }

  p {
    color: ${props => props.theme.colors.gray.dark};
    font-size: ${props => props.theme.typography.fontSize.base};
  }
`;

const CartItem = styled(Card)`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
`;

const ItemInfo = styled.div`
  flex-grow: 1;
`;

const ItemName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${props => props.theme.text};
`;

const ItemPrice = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.theme.primary};
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled(Button)`
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
`;

const RemoveButton = styled(Button)`
  background-color: ${props => props.theme.error};
  margin-left: 1rem;
`;

const CartSummary = styled(Card)`
  margin-top: 2rem;
  padding: 1rem;
`;

const TotalPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.primary};
  margin: 1rem 0;
`;

const CheckoutButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart?.items || []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.cart.getCart();
        dispatch(setCartItems(response.data));
      } catch (error) {
        console.error('장바구니를 불러오는데 실패했습니다:', error);
      }
    };

    fetchCart();
  }, [dispatch]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await api.cart.updateQuantity(itemId, newQuantity);
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    } catch (error) {
      console.error('수량 변경에 실패했습니다:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await api.cart.removeFromCart(itemId);
      dispatch(removeItem(itemId));
    } catch (error) {
      console.error('상품 삭제에 실패했습니다:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContainer>
      <CartTitle>장바구니</CartTitle>
      {cartItems.length === 0 ? (
        <EmptyCart>
          <h3>장바구니가 비어있습니다</h3>
          <p>상품을 추가해주세요</p>
        </EmptyCart>
      ) : (
        <div>
          {cartItems.map(item => (
            <CartItem key={item.id}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
              </ItemInfo>
              <QuantityControl>
                <QuantityButton
                  onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                >
                  -
                </QuantityButton>
                <span>{item.quantity}</span>
                <QuantityButton
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </QuantityButton>
              </QuantityControl>
              <RemoveButton onClick={() => handleRemoveItem(item.id)}>
                삭제
              </RemoveButton>
            </CartItem>
          ))}
          <CartSummary>
            <h3>주문 요약</h3>
            <TotalPrice>총 금액: {totalPrice.toLocaleString()}원</TotalPrice>
            <CheckoutButton onClick={handleCheckout}>
              주문하기
            </CheckoutButton>
          </CartSummary>
        </div>
      )}
    </CartContainer>
  );
};

export default CartPage; 