import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const HomeContainer = styled.div`
  min-height: calc(100vh - 60px);
  background-color: ${props => props.theme.colors.background};
`;

const HeroSection = styled.div`
  height: 500px;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
              url('/images/hero-flowers.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>아름다운 꽃으로 전하는 마음</HeroTitle>
          <HeroSubtitle>
            신선한 꽃과 아름다운 꽃다발로 특별한 순간을 더욱 특별하게 만들어드립니다.
          </HeroSubtitle>
          <Button as={Link} to="/shop">꽃다발 구경하기</Button>
        </HeroContent>
      </HeroSection>
    </HomeContainer>
  );
};

export default HomePage; 