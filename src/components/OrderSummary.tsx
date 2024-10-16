import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "@radix-ui/react-separator";
import { Trash } from "lucide-react";

type Props = {
  cartItems: CartItem[];
  restaurant: Restaurant;
  removeFromCart: (cartItem: CartItem) => void;
};
const OrderSummary = ({ cartItems, restaurant, removeFromCart }: Props) => {
  function getTotalCost(): string {
    const sum = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantitty,
      0
    );
    const totalWithDelivery = sum + restaurant.deliveryPrice;
    return (totalWithDelivery / 100).toFixed(2);
  }
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your order</span>
          <span>Rs {getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between">
            <div>
              {" "}
              <Badge variant="outline" className="mr-2">
                {item.quantitty}
              </Badge>
              {item.name}
            </div>
            <div className="flex items-center gap-1">
              <Trash
                onClick={() => removeFromCart(item)}
                className="text-red-500 cursor-pointer"
                size={20}
              />
              Rs {((item.price * item.quantitty) / 100).toFixed(2)}
            </div>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <div>Delivery</div>
          <div>Rs {(restaurant.deliveryPrice / 100).toFixed(2)}</div>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};
export default OrderSummary;
