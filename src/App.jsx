import "./App.css";
import { useState } from "react";
import styled from "styled-components";

import Header from "./Header.jsx";
import CategoryFilter from "./CategoryFilter.jsx";
import RestaurantList from "./RestaurantList.jsx";
import RestaurantDetailModal from "./RestaurantDetailModal.jsx";
import AddRestaurantModal from "./AddRestaurantModal.jsx";
import useRestaurants from "./hooks/useRestaurants.js";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 600px; /* PC에서도 모바일 비율 유지 위함 */
  margin: 0 auto;
  background-color: var(--grey-100);
  min-height: 100vh;
`;

function App() {
  const { restaurants, addRestaurant } = useRestaurants();
  const [category, setCategory] = useState("전체");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredRestaurants =
    category === "전체"
      ? restaurants
      : restaurants.filter((restaurant) => restaurant.category === category);

  return (
    <>
      <Header setIsAddModalOpen={setIsAddModalOpen} />
      <MainContainer>
        <CategoryFilter category={category} setCategory={setCategory} />
        <RestaurantList
          restaurants={filteredRestaurants}
          setSelectedRestaurant={setSelectedRestaurant}
        />
      </MainContainer>
      <aside>
        {selectedRestaurant && (
          <RestaurantDetailModal
            restaurant={selectedRestaurant}
            setSelectedRestaurant={setSelectedRestaurant}
          />
        )}
        {isAddModalOpen && (
          <AddRestaurantModal
            onAddRestaurant={addRestaurant}
            setIsAddModalOpen={setIsAddModalOpen}
          />
        )}
      </aside>
    </>
  );
}

export default App;
