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

const ImagePreview = styled.div`
  margin-top: 1rem;
  max-width: 300px;

  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
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

const HomeManagement = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState({
    hero: {
      title: '',
      description: '',
      image: null
    },
    flower: {
      title: '',
      description: '',
      image: null
    },
    plant: {
      title: '',
      description: '',
      image: null
    },
    class: {
      title: '',
      description: '',
      image: null
    }
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await api.admin.getContent();
      setContent(response.data.home);
    } catch (error) {
      console.error('Failed to load content:', error);
    }
  };

  const handleImageChange = async (section, file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await api.admin.uploadImage(formData);
      setContent(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          image: response.data.imageUrl
        }
      }));
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const handleTextChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    try {
      await api.admin.updateContent({ home: content });
      alert('홈페이지 콘텐츠가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('Failed to save content:', error);
      alert('콘텐츠 저장에 실패했습니다.');
    }
  };

  return (
    <Container>
      <Header>
        <Title>홈페이지 관리</Title>
        <BackButton onClick={() => navigate('/admin')}>돌아가기</BackButton>
      </Header>

      <Section>
        <SectionTitle>메인 섹션</SectionTitle>
        <FormGroup>
          <label>메인 이미지</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange('hero', e.target.files[0])}
          />
          {content.hero.image && (
            <ImagePreview>
              <img src={content.hero.image} alt="Hero" />
            </ImagePreview>
          )}
        </FormGroup>

        <FormGroup>
          <label>메인 제목</label>
          <Input
            type="text"
            value={content.hero.title}
            onChange={(e) => handleTextChange('hero', 'title', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>메인 설명</label>
          <TextArea
            value={content.hero.description}
            onChange={(e) => handleTextChange('hero', 'description', e.target.value)}
          />
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>Flower 섹션</SectionTitle>
        <FormGroup>
          <label>이미지</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange('flower', e.target.files[0])}
          />
          {content.flower.image && (
            <ImagePreview>
              <img src={content.flower.image} alt="Flower" />
            </ImagePreview>
          )}
        </FormGroup>

        <FormGroup>
          <label>제목</label>
          <Input
            type="text"
            value={content.flower.title}
            onChange={(e) => handleTextChange('flower', 'title', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>설명</label>
          <TextArea
            value={content.flower.description}
            onChange={(e) => handleTextChange('flower', 'description', e.target.value)}
          />
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>Plant 섹션</SectionTitle>
        <FormGroup>
          <label>이미지</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange('plant', e.target.files[0])}
          />
          {content.plant.image && (
            <ImagePreview>
              <img src={content.plant.image} alt="Plant" />
            </ImagePreview>
          )}
        </FormGroup>

        <FormGroup>
          <label>제목</label>
          <Input
            type="text"
            value={content.plant.title}
            onChange={(e) => handleTextChange('plant', 'title', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>설명</label>
          <TextArea
            value={content.plant.description}
            onChange={(e) => handleTextChange('plant', 'description', e.target.value)}
          />
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>Class 섹션</SectionTitle>
        <FormGroup>
          <label>이미지</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange('class', e.target.files[0])}
          />
          {content.class.image && (
            <ImagePreview>
              <img src={content.class.image} alt="Class" />
            </ImagePreview>
          )}
        </FormGroup>

        <FormGroup>
          <label>제목</label>
          <Input
            type="text"
            value={content.class.title}
            onChange={(e) => handleTextChange('class', 'title', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>설명</label>
          <TextArea
            value={content.class.description}
            onChange={(e) => handleTextChange('class', 'description', e.target.value)}
          />
        </FormGroup>
      </Section>

      <SaveButton onClick={handleSave}>저장하기</SaveButton>
    </Container>
  );
};

export default HomeManagement; 