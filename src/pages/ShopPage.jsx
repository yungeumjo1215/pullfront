import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const ShopContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProductCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const ProductInfo = styled.div`
  padding: 1rem;
  flex-grow: 1;
`;

const ProductName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${props => props.theme.text};
`;

const ProductPrice = styled.p`
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.theme.primary};
`;

const AddToCartButton = styled(Button)`
  width: 100%;
  margin-top: auto;
`;

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.products.getAll();
        setProducts(response.data);
      } catch (err) {
        setError('상품 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await api.cart.addToCart(productId);
      // TODO: 장바구니 상태 업데이트
    } catch (err) {
      setError('장바구니에 상품을 추가하는데 실패했습니다.');
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ShopContainer>
      <h2>꽃 상품 목록</h2>
      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
              <AddToCartButton onClick={() => handleAddToCart(product.id)}>
                장바구니에 담기
              </AddToCartButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </ShopContainer>
  );
};

export default ShopPage; 