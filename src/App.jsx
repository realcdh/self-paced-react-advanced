import "./App.css";
import styled from "styled-components";
import { useRestaurantStore } from "./stores/useRestaurantStore.js";

import Header from "./Header.jsx";
import CategoryFilter from "./CategoryFilter.jsx";
import RestaurantList from "./RestaurantList.jsx";
import RestaurantDetailModal from "./RestaurantDetailModal.jsx";
import AddRestaurantModal from "./AddRestaurantModal.jsx";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0;
  background-color: var(--grey-100);
  min-height: 100vh;
`;

function App() {
  const selectedRestaurant = useRestaurantStore(
    (state) => state.selectedRestaurant,
  );
  const isAddModalOpen = useRestaurantStore((state) => state.isAddModalOpen);

  return (
    <>
      <Header />
      <MainContainer>
        <CategoryFilter />
        <RestaurantList />
      </MainContainer>
      <aside>
        {selectedRestaurant && <RestaurantDetailModal />}
        {isAddModalOpen && <AddRestaurantModal />}
      </aside>
    </>
  );
}

export default App;
