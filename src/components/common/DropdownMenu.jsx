import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const DropdownContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  background-color: ${props => props.theme.colors.background};
  min-width: 200px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 4px;
  padding: 0.5rem 0;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.theme.colors.text};

  &:hover {
    background-color: ${props => props.theme.colors.primary}20;
  }
`;

const SubDropdownContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  background-color: ${props => props.theme.colors.background};
  padding-left: 1rem;
`;

const Arrow = styled.span`
  margin-left: 0.5rem;
  transition: transform 0.2s;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  display: block;
  width: 100%;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const DropdownMenu = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  const handleSubmenuClick = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  return (
    <DropdownContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DropdownButton>
        {title}
        <Arrow isOpen={isOpen}>▼</Arrow>
      </DropdownButton>
      <DropdownContent isOpen={isOpen}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.items ? (
              <>
                <DropdownItem onClick={() => handleSubmenuClick(index)}>
                  {item.title}
                  <Arrow isOpen={openSubmenu === index}>▶</Arrow>
                </DropdownItem>
                <SubDropdownContent isOpen={openSubmenu === index}>
                  {item.items.map((subItem, subIndex) => (
                    <DropdownItem key={subIndex}>
                      <StyledLink to={subItem.path}>
                        {subItem.title}
                      </StyledLink>
                    </DropdownItem>
                  ))}
                </SubDropdownContent>
              </>
            ) : (
              <DropdownItem>
                <StyledLink to={item.path}>
                  {item.title}
                </StyledLink>
              </DropdownItem>
            )}
          </React.Fragment>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default DropdownMenu; 