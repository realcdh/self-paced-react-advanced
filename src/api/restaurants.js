const baseUrl = "http://localhost:3000";

export const fetchRestaurants = async () => {
  const response = await fetch(`${baseUrl}/restaurants`);
  if (!response.ok) throw new Error("음식점 목록을 불러오지 못했어요.");
  return response.json();
};

export const postRestaurant = async (newRestaurant) => {
  const response = await fetch(`${baseUrl}/restaurants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRestaurant),
  });
  if (!response.ok) throw new Error("음식점 추가에 실패했어요.");
  
  return response.json();
};