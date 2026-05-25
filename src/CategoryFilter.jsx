import React, { useContext } from 'react';
import styled from 'styled-components';
import { RestaurantContext } from './contexts/RestaurantContext';

const FilterContainer = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  margin-top: 24px;
`;

const FilterSelect = styled.select`
  height: 44px;
  min-width: 125px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  background: transparent;
  font-size: 16px;
  padding: 8px;
`;

const CATEGORIES = ["전체", "한식", "중식", "일식", "양식", "아시안", "기타"];

export default function CategoryFilter() {
  const { category, setCategory } = useContext(RestaurantContext);

  return (
    <FilterContainer>
      <FilterSelect
        name="category"
        id="category-filter"
        aria-label="음식점 카테고리 필터"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </FilterSelect>
    </FilterContainer>
  );
}