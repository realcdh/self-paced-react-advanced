import React from 'react';
import styled from 'styled-components';

// Button 컴포넌트
const Button = styled.button`
  height: 40px;
  border: none;
  border-radius: 8px;
  background: transparent;
  font-size: 24px;
  cursor: pointer;

  img {
    display: block;
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
`;

// 스타일 컴포넌트 이름을 Header에서 HeaderContainer로 변경하여 충돌 방지
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 16px;
  background-color: var(--primary-color);
`;

const Title = styled.h1`
  color: #fcfcfd;
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
`;

// 리액트 컴포넌트 이름은 그대로 Header 유지
export default function Header({ setIsAddModalOpen }) {
  const handleClickAddButton = () => {
    setIsAddModalOpen(true);
  };

  return (
    <HeaderContainer> {/* 변경된 이름 사용 */}
      <Title>점심 뭐 먹지</Title>
      <Button
        type="button"
        aria-label="음식점 추가"
        onClick={handleClickAddButton}
      >
        <img src="./add-button.png" alt="음식점 추가" />
      </Button>
    </HeaderContainer>
  );
}