import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
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

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  line-height: 1.6;
`;

const CategoryGrid = styled.div`
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
  height: 250px;
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
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
`;

const CategoryTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

const CategoryDescription = styled.p`
  margin: 0.5rem 0 0;
  font-size: 1rem;
  opacity: 0.9;
`;

const PlantMainPage = () => {
  const categories = [
    {
      title: '사무실 식물',
      description: '사무실을 더욱 생동감 있게 만들어주는 식물',
      image: '/images/office-plant.jpg',
      path: '/plant/office'
    },
    {
      title: '인테리어 식물',
      description: '공간을 더욱 아름답게 장식하는 인테리어 식물',
      image: '/images/interior-plant.jpg',
      path: '/plant/interior'
    },
    {
      title: '화분 & 가이드',
      description: '식물 관리에 필요한 화분과 가이드',
      image: '/images/plant-pot.jpg',
      path: '/plant/pots'
    }
  ];

  return (
    <PageContainer>
      <HeroSection>
        <img src="/images/plant-hero.jpg" alt="Plant Category Hero" />
        <HeroOverlay>
          <HeroTitle>Plant</HeroTitle>
          <HeroDescription>
            자연의 생명력을 공간에 담아드립니다.
            인테리어 식물부터 사무실 식물까지, 모든 공간을 식물로 장식해드립니다.
          </HeroDescription>
        </HeroOverlay>
      </HeroSection>

      <CategoryGrid>
        {categories.map((category, index) => (
          <CategoryCard key={index} to={category.path}>
            <img src={category.image} alt={category.title} />
            <CategoryOverlay>
              <CategoryTitle>{category.title}</CategoryTitle>
              <CategoryDescription>{category.description}</CategoryDescription>
            </CategoryOverlay>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </PageContainer>
  );
};

export default PlantMainPage; 