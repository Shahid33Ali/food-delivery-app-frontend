import { cuisineList } from "@/config/restaurant-options";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cusines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};
const CuisinesFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) => {
  function handleCuisinesChange(e: ChangeEvent<HTMLInputElement>) {
    const cuisineSelected = e.target.value;
    const isSelected = e.target.checked;
    const newCuisinesList = isSelected
      ? [...selectedCuisines, cuisineSelected]
      : selectedCuisines.filter((cuisine) => cuisine !== cuisineSelected);
    onChange(newCuisinesList);
  }
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter Cuisine</div>
        <div
          onClick={() => onChange([])}
          className="text-md font-semibold mb-2 hover:underline hover:text-blue-500 cursor-pointer"
        >
          Reset Filters
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className="flex">
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  value={cuisine}
                  checked={isSelected}
                  className="hidden"
                  onChange={handleCuisinesChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full py-2 px-4 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
        <Button
          onClick={onExpandedClick}
          variant="link"
          className="mt-4 flex-1"
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};
export default CuisinesFilter;
