import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.white};
  padding: 4rem 2rem 2rem;
  margin-top: 4rem;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${props => props.theme.colors.primary};
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const EventCard = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const EventInfo = styled.div`
  padding: 1rem;
`;

const EventTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
`;

const EventDate = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.secondary};
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 3rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  text-align: center;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const events = [
    {
      title: '봄맞이 꽃다발 클래스',
      date: '2024.03.15',
      image: '/images/event-spring.jpg',
      link: '/class/terrarium'
    },
    {
      title: '웨딩 플라워 데코레이션',
      date: '2024.03.20',
      image: '/images/event-wedding.jpg',
      link: '/flower/wedding-decoration'
    }
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About Us</h3>
          <ul>
            <li><Link to="/about">회사 소개</Link></li>
            <li><Link to="/contact">문의하기</Link></li>
            <li><Link to="/location">오시는 길</Link></li>
            <li><Link to="/careers">채용 정보</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Shop</h3>
          <ul>
            <li><Link to="/flower">Flower</Link></li>
            <li><Link to="/plant">Plant</Link></li>
            <li><Link to="/class">Class</Link></li>
            <li><Link to="/gift">선물세트</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Support</h3>
          <ul>
            <li><Link to="/faq">자주 묻는 질문</Link></li>
            <li><Link to="/shipping">배송 안내</Link></li>
            <li><Link to="/returns">반품/교환</Link></li>
            <li><Link to="/privacy">개인정보처리방침</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Events</h3>
          {events.map((event, index) => (
            <EventCard key={index}>
              <Link to={event.link}>
                <EventImage src={event.image} alt={event.title} />
                <EventInfo>
                  <EventTitle>{event.title}</EventTitle>
                  <EventDate>{event.date}</EventDate>
                </EventInfo>
              </Link>
            </EventCard>
          ))}
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>© {currentYear} pull_percent. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 