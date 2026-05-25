import React from 'react';
import styled from 'styled-components';

// .modal--open 스타일
const ModalOverlay = styled.div`
  display: block;
`;

// .modal-backdrop 스타일
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.35);
`;

// .modal-container 스타일
const ModalContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;

  padding: 32px 16px;

  border-radius: 8px 8px 0px 0px;
  background: var(--grey-100);
`;

// .modal-title 및 .text-title 스타일
const Title = styled.h2`
  margin-bottom: 36px;
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
`;

// .restaurant-info 스타일
const RestaurantInfo = styled.div`
  margin-bottom: 24px;
`;

// .text-body 스타일
const Description = styled.p`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
`;

// .button-container 스타일
const ButtonContainer = styled.div`
  display: flex;
`;

// .button, .button--primary, .text-caption 스타일
const PrimaryButton = styled.button`
  width: 100%;
  height: 44px;

  border: none;
  border-radius: 8px;

  font-weight: 600;
  cursor: pointer;

  background: var(--primary-color);
  color: var(--grey-100);
  font-size: 14px;
  line-height: 20px;
`;

export default function RestaurantDetailModal({
    restaurant,
    setSelectedRestaurant,
}) {
    const handleCloseModal = () => {
        setSelectedRestaurant(null);
    };

    return (
        <ModalOverlay>
            <Backdrop onClick={handleCloseModal} />
            <ModalContainer>
                <Title>{restaurant.name}</Title>
                <RestaurantInfo>
                    <Description>
                        {restaurant.description}
                    </Description>
                </RestaurantInfo>
                <ButtonContainer>
                    <PrimaryButton onClick={handleCloseModal}>
                        확인
                    </PrimaryButton>
                </ButtonContainer>
            </ModalContainer>
        </ModalOverlay>
    );
}