import { Restaurant } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

const RestaurantInfo = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font bold tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurant.cuisines.map((item, i) => (
          <div className="flex">
            {item}
            {i !== restaurant.cuisines.length - 1 && <Dot />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export default RestaurantInfo;
