import { createContext, useState, useEffect, useMemo, useContext } from "react";
import { initialRestaurants } from "../constants/initialRestaurants.js";

const RESTAURANTS_API_URL = "http://localhost:3000/restaurants";

// 1. 데이터 전용 Context
export const RestaurantDataContext = createContext(null);
// 2. UI 전용 Context (필터, 모달 등)
export const RestaurantUIContext = createContext(null);

// 커스텀 훅 - 데이터 사용 시
export const useRestaurantData = () => {
  const context = useContext(RestaurantDataContext);
  if (!context)
    throw new Error(
      "useRestaurantData must be used within a RestaurantDataProvider",
    );
  return context;
};

// 커스텀 훅 - UI 상태 사용 시
export const useRestaurantUI = () => {
  const context = useContext(RestaurantUIContext);
  if (!context)
    throw new Error(
      "useRestaurantUI must be used within a RestaurantUIProvider",
    );
  return context;
};

// 데이터 Provider
export const RestaurantDataProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState(initialRestaurants);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(RESTAURANTS_API_URL);
        if (!response.ok) throw new Error("데이터 불러오기 실패");
        const restaurantData = await response.json();
        setRestaurants(restaurantData);
      } catch (error) {
        console.error(
          "음식점 데이터를 불러오는 중 오류가 발생했습니다:",
          error,
        );
      }
    };
    fetchRestaurants();
  }, []);

  const addRestaurant = async (newRestaurant) => {
    try {
      const response = await fetch(RESTAURANTS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRestaurant),
      });
      if (!response.ok) throw new Error("추가 실패");
      const createdRestaurant = await response.json();
      setRestaurants((prev) => [...prev, createdRestaurant]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const dataValue = useMemo(
    () => ({ restaurants, addRestaurant }),
    [restaurants],
  );

  return (
    <RestaurantDataContext.Provider value={dataValue}>
      {children}
    </RestaurantDataContext.Provider>
  );
};

// UI Provider (데이터가 필요하므로 RestaurantDataProvider 하위에서 사용)
export const RestaurantUIProvider = ({ children }) => {
  const { restaurants } = useRestaurantData();

  const [category, setCategory] = useState("전체");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const filteredRestaurants = useMemo(() => {
    return category === "전체"
      ? restaurants
      : restaurants.filter((r) => r.category === category);
  }, [restaurants, category]);

  const uiValue = useMemo(
    () => ({
      filteredRestaurants,
      category,
      setCategory,
      isAddModalOpen,
      setIsAddModalOpen,
      selectedRestaurant,
      setSelectedRestaurant,
    }),
    [filteredRestaurants, category, isAddModalOpen, selectedRestaurant],
  );

  return (
    <RestaurantUIContext.Provider value={uiValue}>
      {children}
    </RestaurantUIContext.Provider>
  );
};

// 기존 코드와의 호환성을 위한 통합 Provider
export const RestaurantProvider = ({ children }) => {
  return (
    <RestaurantDataProvider>
      <RestaurantUIProvider>{children}</RestaurantUIProvider>
    </RestaurantDataProvider>
  );
};
