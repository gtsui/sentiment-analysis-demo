import { useState, ChangeEvent, useEffect } from "react";
import MagnifyingGlass from "@/src/assets/icons/ui/magnifying_glass.svg";

type Props = {
  placeholder: string;
  onSearch: (value: string) => void;
  searchAfterDelay?: number;
};

const Search = ({ placeholder, onSearch, searchAfterDelay }: Props) => {
  // ==========================================================================
  // STATE / HOOKS
  // ==========================================================================
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (searchValue === "") {
      onSearch(searchValue);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      onSearch(searchValue);
      // Send Axios request here
    }, searchAfterDelay ?? 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);
  // ==========================================================================
  // STATE / HOOKS
  // ==========================================================================
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setSearchValue(target.value);
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchValue);
    }
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <div className="flex flex-col w-full items-center">
      <div className="relative w-[90%]">
        <input
          className="bg-neutral-700 h-10 px-5 pr-10 w-full rounded-full text-contrast-high focus:outline-none"
          type={"search"}
          name={"search"}
          value={searchValue}
          placeholder={placeholder}
          onChange={searchHandler}
          onKeyDown={keyDownHandler}
        />
        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
          <MagnifyingGlass alt="" height={16} width={16} fill="#FFFFFF" />
        </button>
      </div>
    </div>
  );
};

export default Search;
