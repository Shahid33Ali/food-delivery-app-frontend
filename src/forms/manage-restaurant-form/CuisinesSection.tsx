import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options";
import { useFormContext } from "react-hook-form";
import CuisineCheckBox from "./CuisineCheckbox";

const CuisinesSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>Enter the cuisines</FormDescription>
      </div>
      <FormField
        name="cuisines"
        control={control}
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {cuisineList.map((el) => (
                <CuisineCheckBox cuisine={el} field={field} />
              ))}
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};
export default CuisinesSection;
