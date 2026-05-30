import React from "react";
import styled from "styled-components";
import { useRestaurantStore } from "./stores/useRestaurantStore.js";

const ModalOverlay = styled.div`
  display: block;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.35);
`;

const ModalContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 32px 16px;
  border-radius: 8px 8px 0px 0px;
  background: var(--grey-100);
`;

const Title = styled.h2`
  margin-bottom: 36px;
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
`;

const RestaurantInfo = styled.div`
  margin-bottom: 24px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

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

export default function RestaurantDetailModal() {
  const selectedRestaurant = useRestaurantStore(
    (state) => state.selectedRestaurant,
  );
  const setSelectedRestaurant = useRestaurantStore(
    (state) => state.setSelectedRestaurant,
  );

  const handleCloseModal = () => {
    setSelectedRestaurant(null);
  };

  return (
    <ModalOverlay>
      <Backdrop onClick={handleCloseModal} />
      <ModalContainer>
        <Title>{selectedRestaurant.name}</Title>
        <RestaurantInfo>
          <Description>{selectedRestaurant.description}</Description>
        </RestaurantInfo>
        <ButtonContainer>
          <PrimaryButton onClick={handleCloseModal}>확인</PrimaryButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}
