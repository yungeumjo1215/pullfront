import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ClassGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ClassCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ClassImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const ClassInfo = styled.div`
  padding: 1rem;
  flex-grow: 1;
`;

const ClassName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${props => props.theme.colors.text};
`;

const ClassDescription = styled.p`
  margin: 0 0 1rem 0;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ClassDetails = styled.div`
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
`;

const ClassPrice = styled.p`
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

const EnrollButton = styled(Button)`
  width: 100%;
  margin-top: auto;
`;

const ClassPage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.classes.getAll();
        setClasses(response.data);
      } catch (err) {
        setError('클래스 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleEnroll = async (classId) => {
    try {
      await api.classes.enroll(classId);
      // TODO: 수강 신청 상태 업데이트
    } catch (err) {
      setError('수강 신청에 실패했습니다.');
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <PageContainer>
      <h2>클래스</h2>
      <ClassGrid>
        {classes.map(classItem => (
          <ClassCard key={classItem.id}>
            <ClassImage src={classItem.image} alt={classItem.name} />
            <ClassInfo>
              <ClassName>{classItem.name}</ClassName>
              <ClassDescription>{classItem.description}</ClassDescription>
              <ClassDetails>
                <p>수강 기간: {classItem.duration}</p>
                <p>수강 인원: {classItem.maxStudents}명</p>
                <p>수강 장소: {classItem.location}</p>
              </ClassDetails>
              <ClassPrice>{classItem.price.toLocaleString()}원</ClassPrice>
              <EnrollButton onClick={() => handleEnroll(classItem.id)}>
                수강 신청하기
              </EnrollButton>
            </ClassInfo>
          </ClassCard>
        ))}
      </ClassGrid>
    </PageContainer>
  );
};

export default ClassPage; 