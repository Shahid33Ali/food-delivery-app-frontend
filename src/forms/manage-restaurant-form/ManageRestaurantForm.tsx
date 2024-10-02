import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";
const formShema = z
  .object({
    restaurantName: z.string({ required_error: "restaurant name is required" }),
    city: z.string({ required_error: "restaurant name is required" }),
    country: z.string({ required_error: "restaurant name is required" }),
    deliveryPrice: z.coerce.number({
      required_error: "restaurant name is required",
      invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "restaurant name is required",
      invalid_type_error: "must be valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "please select atleast one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageFile || data.imageUrl, {
    message: "Either image or image File must be provided",
    path: ["imageFile"],
  });
type ResFormData = z.infer<typeof formShema>;
type Props = {
  restaurant: Restaurant;
  onSave: (restaurantDataForm: FormData) => void;
  isLoading: boolean;
};
export const ManageRestaurantForm = ({
  onSave,
  isLoading,
  restaurant,
}: Props) => {
  const form = useForm<ResFormData>({
    resolver: zodResolver(formShema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });
  useEffect(() => {
    if (!restaurant) {
      return;
    }
    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );
    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));
    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };
    form.reset(updatedRestaurant);
  }, [form, restaurant]);
  function onSubmit(formDataJson: ResFormData) {
    const formData = new FormData();
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, i) =>
      formData.append(`cuisines[${i}]`, cuisine)
    );
    formDataJson.menuItems.forEach((menuItem, i) => {
      formData.append(`menuItems[${i}][name]`, menuItem.name);
      formData.append(
        `menuItems[${i}][price]`,
        (menuItem.price * 100).toString()
      );
    });
    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }
    onSave(formData);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};
