import "./App.css";
import styled from "styled-components";
import { useContext } from "react";
import { RestaurantProvider, RestaurantContext } from "./contexts/RestaurantContext.jsx";

import Header from "./Header.jsx";
import CategoryFilter from "./CategoryFilter.jsx";
import RestaurantList from "./RestaurantList.jsx";
import RestaurantDetailModal from "./RestaurantDetailModal.jsx";
import AddRestaurantModal from "./AddRestaurantModal.jsx";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  background-color: var(--grey-100);
  min-height: 100vh;
`;

function AppContent() {
  const { selectedRestaurant, isAddModalOpen } = useContext(RestaurantContext);

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

function App() {
  return (
    <RestaurantProvider>
      <AppContent />
    </RestaurantProvider>
  );
}

export default App;