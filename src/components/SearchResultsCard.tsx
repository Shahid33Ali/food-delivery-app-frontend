import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
  resturant: Restaurant;
};
const SearchResultsCard = ({ resturant }: Props) => {
  return (
    <Link
      to={`/details/${resturant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group mt-6"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={`${resturant.imageUrl}`}
          className="rounded w-full h-full object-cover"
        />
      </AspectRatio>
      <div className="flex flex-col">
        <h3 className="font-bold text-2xl tracking-tight mb-2 group-hover:underline">
          {resturant.restaurantName}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-row flex-wrap">
            {resturant.cuisines.map((item, index) => (
              <span className="flex">
                <span>{item}</span>
                {index < resturant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" />
              {resturant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Delivery from Rs.{(resturant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default SearchResultsCard;
