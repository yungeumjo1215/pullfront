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

const PlantManagement = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState({
    office: {
      title: '',
      description: '',
      image: null,
      price: '',
      stock: ''
    },
    interior: {
      title: '',
      description: '',
      image: null,
      price: '',
      stock: ''
    },
    potted: {
      title: '',
      description: '',
      image: null,
      price: '',
      stock: ''
    }
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await api.admin.getPlantContent();
      setContent(response.data);
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
      await api.admin.updatePlantContent(content);
      alert('식물 상품 정보가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('Failed to save content:', error);
      alert('상품 정보 저장에 실패했습니다.');
    }
  };

  return (
    <Container>
      <Header>
        <Title>Plant 상품 관리</Title>
        <BackButton onClick={() => navigate('/admin')}>돌아가기</BackButton>
      </Header>

      <Section>
        <SectionTitle>사무실 식물</SectionTitle>
        <FormGroup>
          <label>이미지</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange('office', e.target.files[0])}
          />
          {content.office.image && (
            <ImagePreview>
              <img src={content.office.image} alt="Office Plant" />
            </ImagePreview>
          )}
        </FormGroup>

        <FormGroup>
          <label>제목</label>
          <Input
            type="text"
            value={content.office.title}
            onChange={(e) => handleTextChange('office', 'title', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>설명</label>
          <TextArea
            value={content.office.description}
            onChange={(e) => handleTextChange('office', 'description', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>가격</label>
          <Input
            type="number"
            value={content.office.price}
            onChange={(e) => handleTextChange('office', 'price', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>재고</label>
          <Input
            type="number"
            value={content.office.stock}
            onChange={(e) => handleTextChange('office', 'stock', e.target.value)}
          />
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>인테리어 식물</SectionTitle>
        <FormGroup>
          <label>이미지</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange('interior', e.target.files[0])}
          />
          {content.interior.image && (
            <ImagePreview>
              <img src={content.interior.image} alt="Interior Plant" />
            </ImagePreview>
          )}
        </FormGroup>

        <FormGroup>
          <label>제목</label>
          <Input
            type="text"
            value={content.interior.title}
            onChange={(e) => handleTextChange('interior', 'title', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>설명</label>
          <TextArea
            value={content.interior.description}
            onChange={(e) => handleTextChange('interior', 'description', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>가격</label>
          <Input
            type="number"
            value={content.interior.price}
            onChange={(e) => handleTextChange('interior', 'price', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>재고</label>
          <Input
            type="number"
            value={content.interior.stock}
            onChange={(e) => handleTextChange('interior', 'stock', e.target.value)}
          />
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>화분 식물</SectionTitle>
        <FormGroup>
          <label>이미지</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange('potted', e.target.files[0])}
          />
          {content.potted.image && (
            <ImagePreview>
              <img src={content.potted.image} alt="Potted Plant" />
            </ImagePreview>
          )}
        </FormGroup>

        <FormGroup>
          <label>제목</label>
          <Input
            type="text"
            value={content.potted.title}
            onChange={(e) => handleTextChange('potted', 'title', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>설명</label>
          <TextArea
            value={content.potted.description}
            onChange={(e) => handleTextChange('potted', 'description', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>가격</label>
          <Input
            type="number"
            value={content.potted.price}
            onChange={(e) => handleTextChange('potted', 'price', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>재고</label>
          <Input
            type="number"
            value={content.potted.stock}
            onChange={(e) => handleTextChange('potted', 'stock', e.target.value)}
          />
        </FormGroup>
      </Section>

      <SaveButton onClick={handleSave}>저장하기</SaveButton>
    </Container>
  );
};

export default PlantManagement; 