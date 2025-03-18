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

const ClassManagement = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState({
    oneday: {
      title: '',
      description: '',
      image: null,
      price: '',
      capacity: '',
      schedule: ''
    },
    regular: {
      title: '',
      description: '',
      image: null,
      price: '',
      capacity: '',
      schedule: ''
    },
    lecture: {
      title: '',
      description: '',
      image: null,
      price: '',
      capacity: '',
      schedule: ''
    }
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await api.admin.getClassContent();
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
      await api.admin.updateClassContent(content);
      alert('클래스 정보가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('Failed to save content:', error);
      alert('클래스 정보 저장에 실패했습니다.');
    }
  };

  return (
    <Container>
      <Header>
        <Title>Class 관리</Title>
        <BackButton onClick={() => navigate('/admin')}>돌아가기</BackButton>
      </Header>

      <Section>
        <SectionTitle>원데이 클래스</SectionTitle>
        <FormGroup>
          <label>이미지</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange('oneday', e.target.files[0])}
          />
          {content.oneday.image && (
            <ImagePreview>
              <img src={content.oneday.image} alt="One Day Class" />
            </ImagePreview>
          )}
        </FormGroup>

        <FormGroup>
          <label>제목</label>
          <Input
            type="text"
            value={content.oneday.title}
            onChange={(e) => handleTextChange('oneday', 'title', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>설명</label>
          <TextArea
            value={content.oneday.description}
            onChange={(e) => handleTextChange('oneday', 'description', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>가격</label>
          <Input
            type="number"
            value={content.oneday.price}
            onChange={(e) => handleTextChange('oneday', 'price', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>수용 인원</label>
          <Input
            type="number"
            value={content.oneday.capacity}
            onChange={(e) => handleTextChange('oneday', 'capacity', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>일정</label>
          <TextArea
            value={content.oneday.schedule}
            onChange={(e) => handleTextChange('oneday', 'schedule', e.target.value)}
          />
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>정규 클래스</SectionTitle>
        <FormGroup>
          <label>이미지</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange('regular', e.target.files[0])}
          />
          {content.regular.image && (
            <ImagePreview>
              <img src={content.regular.image} alt="Regular Class" />
            </ImagePreview>
          )}
        </FormGroup>

        <FormGroup>
          <label>제목</label>
          <Input
            type="text"
            value={content.regular.title}
            onChange={(e) => handleTextChange('regular', 'title', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>설명</label>
          <TextArea
            value={content.regular.description}
            onChange={(e) => handleTextChange('regular', 'description', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>가격</label>
          <Input
            type="number"
            value={content.regular.price}
            onChange={(e) => handleTextChange('regular', 'price', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>수용 인원</label>
          <Input
            type="number"
            value={content.regular.capacity}
            onChange={(e) => handleTextChange('regular', 'capacity', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>일정</label>
          <TextArea
            value={content.regular.schedule}
            onChange={(e) => handleTextChange('regular', 'schedule', e.target.value)}
          />
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>강의</SectionTitle>
        <FormGroup>
          <label>이미지</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange('lecture', e.target.files[0])}
          />
          {content.lecture.image && (
            <ImagePreview>
              <img src={content.lecture.image} alt="Lecture" />
            </ImagePreview>
          )}
        </FormGroup>

        <FormGroup>
          <label>제목</label>
          <Input
            type="text"
            value={content.lecture.title}
            onChange={(e) => handleTextChange('lecture', 'title', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>설명</label>
          <TextArea
            value={content.lecture.description}
            onChange={(e) => handleTextChange('lecture', 'description', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>가격</label>
          <Input
            type="number"
            value={content.lecture.price}
            onChange={(e) => handleTextChange('lecture', 'price', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>수용 인원</label>
          <Input
            type="number"
            value={content.lecture.capacity}
            onChange={(e) => handleTextChange('lecture', 'capacity', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>일정</label>
          <TextArea
            value={content.lecture.schedule}
            onChange={(e) => handleTextChange('lecture', 'schedule', e.target.value)}
          />
        </FormGroup>
      </Section>

      <SaveButton onClick={handleSave}>저장하기</SaveButton>
    </Container>
  );
};

export default ClassManagement; 