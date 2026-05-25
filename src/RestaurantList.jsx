import React from 'react';
import styled from 'styled-components';

const CATEGORY_ICON_MAP = {
  한식: "/category-korean.png",
  중식: "/category-chinese.png",
  일식: "/category-japanese.png",
  양식: "/category-western.png",
  아시안: "/category-asian.png",
  기타: "/category-etc.png",
};

// 컨테이너 스타일
const Container = styled.section`
  padding: 0 16px;
  margin: 16px 0;
`;

// ul 태그를 Styled Component로 정의
const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Restaurant = styled.li`
  display: flex;
  align-items: flex-start;
  padding: 16px 8px;
  border-bottom: 1px solid #e9eaed;
  cursor: pointer; /* 클릭 가능함을 표시 */
`;

const RestaurantCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;
  margin-right: 16px;
  border-radius: 50%;
  background: var(--lighten-color);
`;

const RestaurantInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const CategoryIcon = styled.img`
  width: 36px;
  height: 36px;
`;

const RestaurantName = styled.h3`
  margin: 0;
  font-size: 18px;
  line-height: 28px;
  font-weight: 600;
`;

const RestaurantDescription = styled.p`
  display: -webkit-box;
  padding-top: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
`;

export default function RestaurantList({ restaurants, setSelectedRestaurant }) {
  return (
    <Container>
      <List>
        {restaurants.map((restaurant) => (
          <Restaurant
            key={restaurant.id}
            onClick={() => setSelectedRestaurant(restaurant)}
            role="button"
            tabIndex={0}
          >
            <RestaurantCategory>
              <CategoryIcon
                src={CATEGORY_ICON_MAP[restaurant.category]}
                alt={restaurant.category}
              />
            </RestaurantCategory>
            <RestaurantInfo>
              <RestaurantName>{restaurant.name}</RestaurantName>
              <RestaurantDescription>
                {restaurant.description}
              </RestaurantDescription>
            </RestaurantInfo>
          </Restaurant>
        ))}
      </List>
    </Container>
  );
}