import {
  useCreateRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestuarantApi";
import { ManageRestaurantForm } from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestauarnt, isLoading: isCreateLoading } =
    useCreateRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();
  const isEditing = !!restaurant;

  return (
    <ManageRestaurantForm
      onSave={isEditing ? updateRestaurant : createRestauarnt}
      isLoading={isCreateLoading || isUpdateLoading}
      restaurant={restaurant}
    />
  );
};
export default ManageRestaurantPage;
