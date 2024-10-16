import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItemCard from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/update-profile-form/UserProfileForm";
import { MenuItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";
export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantitty: number;
};
const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const getCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    const cartItems = getCartItems ? JSON.parse(getCartItems) : [];
    return cartItems;
  });
  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const newCartItems = prevCartItems.filter(
        (cartItemPrev) => cartItem._id !== cartItemPrev._id
      );
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(newCartItems)
      );
      return newCartItems;
    });
  };
  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevCartItems) => {
      const esitingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );
      let updated;
      if (esitingCartItem) {
        updated = prevCartItems.map((cartItem) => {
          if (cartItem._id === menuItem._id) {
            return { ...cartItem, quantitty: cartItem.quantitty + 1 };
          }
          return cartItem;
        });
      } else {
        updated = [...prevCartItems, { ...menuItem, quantitty: 1 }];
      }
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updated)
      );
      return updated;
    });
  };
  function onCheckout(formdata: UserFormData) {
    console.log(formdata);
  }
  if (isLoading || !restaurant) {
    return "Loading....";
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[2fr_1fr] gap-5 md:px-20">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <div className="text-2xl font-bold tracking-tight">Menu</div>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItemCard
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            {cartItems.length !== 0 && (
              <CardFooter>
                <CheckoutButton
                  onCheckout={(fotmdata) => onCheckout(fotmdata)}
                />
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
export default DetailPage;
