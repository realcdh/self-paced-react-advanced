import React, { useState } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
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

const Container = styled.div`
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

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 36px;
`;

const Label = styled.label`
  color: var(--grey-400);
  font-size: 14px;

  ${({ $required }) =>
    $required &&
    `
    &::after {
      padding-left: 4px;
      color: var(--primary-color);
      content: '*';
    }
  `}
`;

const Input = styled.input`
  padding: 8px;
  margin: 6px 0;
  border: 1px solid var(--grey-200);
  border-radius: 8px;
  font-size: 16px;
  height: 44px;
`;

const Select = styled.select`
  height: 44px;
  padding: 8px;
  margin: 6px 0;
  border: 1px solid var(--grey-200);
  border-radius: 8px;
  font-size: 16px;
  color: var(--grey-300);
`;

const Textarea = styled.textarea`
  padding: 8px;
  margin: 6px 0;
  border: 1px solid var(--grey-200);
  border-radius: 8px;
  font-size: 16px;
  resize: none;
`;

const HelpText = styled.span`
  color: var(--grey-300);
  font-size: 14px;
  line-height: 20px;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function AddRestaurantModal({
  onAddRestaurant,
  setIsAddModalOpen,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    const form = e.target;
    const category = form.category.value;
    const name = form.name.value;
    const description = form.description.value;

    const newRestaurant = {
      id: `a${Date.now()}`,
      category,
      name,
      description,
    };

    setIsSubmitting(true);

    try {
      const isAdded = await onAddRestaurant(newRestaurant);
      if (isAdded) {
        form.reset();
        handleCloseModal();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalWrapper>
      <Backdrop onClick={handleCloseModal} />
      <Container>
        <Title>새로운 음식점</Title>
        <form onSubmit={handleAddRestaurant}>
          <FormItem>
            <Label htmlFor="category" $required>
              카테고리
            </Label>
            <Select name="category" id="category" required>
              <option value="">선택해 주세요</option>
              <option value="한식">한식</option>
              <option value="중식">중식</option>
              <option value="일식">일식</option>
              <option value="양식">양식</option>
              <option value="아시안">아시안</option>
              <option value="기타">기타</option>
            </Select>
          </FormItem>

          <FormItem>
            <Label htmlFor="name" $required>
              이름
            </Label>
            <Input type="text" name="name" id="name" required />
          </FormItem>

          <FormItem>
            <Label htmlFor="description">설명</Label>
            <Textarea
              name="description"
              id="description"
              cols="30"
              rows="5"
            ></Textarea>
            <HelpText>메뉴 등 추가 정보를 입력해 주세요.</HelpText>
          </FormItem>

          <ButtonContainer>
            <PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "추가 중..." : "추가하기"}
            </PrimaryButton>
          </ButtonContainer>
        </form>
      </Container>
    </ModalWrapper>
  );
}