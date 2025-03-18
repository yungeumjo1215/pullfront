import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  margin-bottom: 4rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CategorySection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled(Link)`
  position: relative;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const CategoryOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
`;

const CategoryTitle = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
`;

const CategoryDescription = styled.p`
  margin: 0.5rem 0 0;
  font-size: 1.1rem;
  opacity: 0.9;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <img src="/images/hero.jpg" alt="Flower Shop Hero" />
      </HeroSection>

      <CategorySection>
        <CategoryCard to="/flower">
          <img src="/images/flower-category.jpg" alt="Flower Category" />
          <CategoryOverlay>
            <CategoryTitle>Flower</CategoryTitle>
            <CategoryDescription>아름다운 꽃다발과 웨딩 장식</CategoryDescription>
          </CategoryOverlay>
        </CategoryCard>

        <CategoryCard to="/plant">
          <img src="/images/plant-category.jpg" alt="Plant Category" />
          <CategoryOverlay>
            <CategoryTitle>Plant</CategoryTitle>
            <CategoryDescription>인테리어 식물과 화분</CategoryDescription>
          </CategoryOverlay>
        </CategoryCard>

        <CategoryCard to="/class">
          <img src="/images/class-category.jpg" alt="Class Category" />
          <CategoryOverlay>
            <CategoryTitle>Class</CategoryTitle>
            <CategoryDescription>플로리스트와 가드닝 클래스</CategoryDescription>
          </CategoryOverlay>
        </CategoryCard>
      </CategorySection>
    </HomeContainer>
  );
};

export default HomePage; 