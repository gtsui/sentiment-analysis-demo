import { Loading } from "@/src/components/common/loading/Loading";
import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import Dropdown from "./dropdown/Dropdown";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  usernameFilter: string[];
  setUsernameFilter: Dispatch<SetStateAction<string[]>>;
  runQueryHandler: (query: string) => void;
  isLoading: boolean;
};

const QueryForm = ({
  query,
  setQuery,
  usernameFilter,
  setUsernameFilter,
  runQueryHandler,
  isLoading,
}: Props) => {
  // ==========================================================================
  // STATE / HOOKS
  // ==========================================================================

  // ==========================================================================
  // FUNCTIONS / HANDLERS
  // ==========================================================================
  const setQueryHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setQuery(target.value);
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runQueryHandler(query);
    }
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <div className="flex flex-col gap-4">
      <input
        className="bg-neutral-700 h-10 px-5 pr-10 w-full rounded-lg text-contrast-high
         placeholder-contrast-low focus:outline-none focus:border focus:border-primary-500"
        placeholder="Keywords"
        onChange={setQueryHandler}
        onKeyDown={keyDownHandler}
      />
      <Dropdown options={options} setUsernameFilter={setUsernameFilter} />
      <div className="flex flex-row items-center gap-2">
        <button
          className="btn-md btn-primary w-28"
          onClick={() => runQueryHandler(query)}
        >
          Run Query
        </button>
        {isLoading && <Loading size={24} />}
      </div>
    </div>
  );
};

export default QueryForm;
