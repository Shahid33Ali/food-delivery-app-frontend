import { useSearchResturants } from "@/api/RestaurantApi";
import CuisinesFilter from "@/components/CuisinesFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchResultsCard from "@/components/SearchResultsCard";
import SortOptionsDropdown from "@/components/SortOptionsDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";
export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};
const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setExpanded] = useState<boolean>(false);
  function setSearchQury(formData: SearchForm) {
    setSearchState((searchState) => ({
      ...searchState,
      searchQuery: formData.searchQuery,
      page: 1,
    }));
  }
  function resetSearch() {
    setSearchState((searchState) => ({
      ...searchState,
      searchQuery: "",
      page: 1,
    }));
  }
  function setPage(page: number) {
    setSearchState((searchState) => ({
      ...searchState,
      page,
    }));
  }
  const setselectedCuisines = (newCuisines: string[]) => {
    setSearchState((searchState) => ({
      ...searchState,
      selectedCuisines: newCuisines,
      page: 1,
    }));
  };
  const setSortOption = (sortOption: string) => {
    setSearchState((searchState) => ({
      ...searchState,
      sortOption,
      page: 1,
    }));
  };
  const { results, isLoading } = useSearchResturants(searchState, city);
  if (isLoading) {
    return <span>Loading ...</span>;
  }
  if (!results || !city) {
    return <span>No Results Found</span>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cusines-list">
        <CuisinesFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setselectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setExpanded((exp) => !exp)}
        />
      </div>
      <div id="main-content" className="flex flex-col">
        <SearchBar
          placeHolder="Enter resturant name or cuisine"
          onSubmit={setSearchQury}
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
        />
        <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionsDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        {results.data.map((restaurant) => (
          <SearchResultsCard resturant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
export default SearchPage;
