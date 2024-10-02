import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyRestaurantRequast = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: restaurantFormData,
    });
    if (!response.ok) {
      throw new Error("There is an error");
    }
    return response.json();
  };
  const {
    mutateAsync: createRestauarnt,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequast);
  if (isSuccess) {
    toast.success("Restaurant Created");
  }
  if (error) {
    console.log(error);
    toast.error("There is an error");
  }
  return {
    isLoading,
    createRestauarnt,
  };
};
export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurantRequest = async () => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("There is an error");
    }
    return res.json();
  };
  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );
  return {
    restaurant,
    isLoading,
  };
};
export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const useUpdateMyRestaurantReq = async (
    data: FormData
  ): Promise<Restaurant> => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    if (!res.ok) {
      throw new Error("There is an error");
    }
    return res.json();
  };
  const {
    mutateAsync: updateRestaurant,
    error,
    isLoading,
    isSuccess,
  } = useMutation(useUpdateMyRestaurantReq);
  if (error) {
    toast.error("There is an error");
  }
  if (isSuccess) {
    toast.success("Updated Successfully!!!");
  }
  return { updateRestaurant, isLoading };
};
