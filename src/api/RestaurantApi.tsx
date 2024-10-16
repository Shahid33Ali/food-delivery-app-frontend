import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RetaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useSearchResturants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RetaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    if (searchState.sortOption !== "bestMatch") {
      params.set("sortOption", searchState.sortOption);
    }
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );
    if (!response.ok) {
      throw new Error("There is an error");
    }
    return response.json();
  };
  const { data: results, isLoading } = useQuery(
    ["searchRestaurant", searchState],
    createSearchRequest,
    { enabled: !!city }
  );
  return {
    results,
    isLoading,
  };
};
export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantById = async (): Promise<Restaurant> => {
    const res = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`);
    if (!res.ok) {
      throw new Error("There is an error");
    }
    return res.json();
  };
  const { data: restaurant, isLoading } = useQuery(
    "getRestaurant",
    getRestaurantById,
    { enabled: !!restaurantId }
  );
  return {
    restaurant,
    isLoading,
  };
};
