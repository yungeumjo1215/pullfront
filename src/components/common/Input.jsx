import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #D4C9BE;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #4A6F4A;
  }

  &::placeholder {
    color: #999;
  }
`;

const Input = ({ ...props }) => {
  return <StyledInput {...props} />;
};

export default Input; 