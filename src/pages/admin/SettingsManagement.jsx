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

const Section = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin: 0 0 1.5rem 0;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.text};
    font-weight: 500;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SaveButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const SettingsManagement = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    businessHours: '',
    shippingPolicy: '',
    returnPolicy: '',
    privacyPolicy: ''
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await api.admin.getSettings();
      setSettings(response.data);
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      await api.admin.updateSettings(settings);
      alert('설정이 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('설정 저장에 실패했습니다.');
    }
  };

  return (
    <Container>
      <Header>
        <Title>시스템 설정</Title>
        <BackButton onClick={() => navigate('/admin')}>돌아가기</BackButton>
      </Header>

      <Section>
        <SectionTitle>기본 정보</SectionTitle>
        <FormGroup>
          <label>사이트 이름</label>
          <Input
            type="text"
            value={settings.siteName}
            onChange={(e) => handleChange('siteName', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>사이트 설명</label>
          <TextArea
            value={settings.siteDescription}
            onChange={(e) => handleChange('siteDescription', e.target.value)}
          />
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>연락처 정보</SectionTitle>
        <FormGroup>
          <label>이메일</label>
          <Input
            type="email"
            value={settings.contactEmail}
            onChange={(e) => handleChange('contactEmail', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>전화번호</label>
          <Input
            type="tel"
            value={settings.contactPhone}
            onChange={(e) => handleChange('contactPhone', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>주소</label>
          <Input
            type="text"
            value={settings.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>영업 시간</label>
          <Input
            type="text"
            value={settings.businessHours}
            onChange={(e) => handleChange('businessHours', e.target.value)}
          />
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>정책</SectionTitle>
        <FormGroup>
          <label>배송 정책</label>
          <TextArea
            value={settings.shippingPolicy}
            onChange={(e) => handleChange('shippingPolicy', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>반품 정책</label>
          <TextArea
            value={settings.returnPolicy}
            onChange={(e) => handleChange('returnPolicy', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>개인정보 처리방침</label>
          <TextArea
            value={settings.privacyPolicy}
            onChange={(e) => handleChange('privacyPolicy', e.target.value)}
          />
        </FormGroup>
      </Section>

      <SaveButton onClick={handleSave}>저장하기</SaveButton>
    </Container>
  );
};

export default SettingsManagement; 