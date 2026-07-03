import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useRestaurantStore = create(
  persist(
    (set) => ({
      category: "전체",
      isAddModalOpen: false,
      selectedRestaurant: null,
      setCategory: (category) => set({ category }),
      setIsAddModalOpen: (isOpen) => set({ isAddModalOpen: isOpen }),
      setSelectedRestaurant: (restaurant) =>
        set({ selectedRestaurant: restaurant }),
    }),
    {
      name: "restaurant-storage",
      partialize: (state) => ({ category: state.category }),
    },
  ),
);