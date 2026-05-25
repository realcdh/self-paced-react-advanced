import { useEffect, useState } from 'react';

import { initialRestaurants } from '../constants/initialRestaurants.js';

const RESTAURANTS_API_URL = 'http://localhost:3000/restaurants';

export default function useRestaurants() {
	const [restaurants, setRestaurants] = useState(initialRestaurants);

	useEffect(() => {
		const fetchRestaurants = async () => {
			try {
				const response = await fetch(RESTAURANTS_API_URL);
				const restaurantData = await response.json();
				setRestaurants(restaurantData);
			} catch (error) {
				console.error(
					'음식점 데이터를 불러오는 중 오류가 발생했습니다:',
					error,
				);
			}
		};

		fetchRestaurants();
	}, []);

	const addRestaurant = async newRestaurant => {
		try {
			const response = await fetch(RESTAURANTS_API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newRestaurant),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					`[${response.status}] 음식점 추가 실패: ${errorData.message || '알 수 없는 서버 에러'}`,
				);
			}

			const createdRestaurant = await response.json();
			setRestaurants(prevRestaurants => [
				...prevRestaurants,
				createdRestaurant,
			]);
			return true;
		} catch (error) {
			console.error('[Error/addRestaurant]:', error.message);
			alert('음식점 추가에 실패했습니다. 잠시 후 다시 시도해 주세요.');
			return false;
		}
	};

	return {
		restaurants,
		addRestaurant,
	};
}
