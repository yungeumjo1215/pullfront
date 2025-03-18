import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.user.isAdmin);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [isAdmin, navigate]);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/admin/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="admin-page">
      <h2>관리자 페이지</h2>
      <div className="user-list">
        <h3>사용자 목록</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>이메일</th>
              <th>이름</th>
              <th>역할</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.id)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage; 