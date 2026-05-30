import React from "react";
import styled from "styled-components";
import { useRestaurantStore } from "./stores/useRestaurantStore.js";
import { CATEGORIES } from "./constants/categories";

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

export default function CategoryFilter() {
  const category = useRestaurantStore((state) => state.category);
  const setCategory = useRestaurantStore((state) => state.setCategory);

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
