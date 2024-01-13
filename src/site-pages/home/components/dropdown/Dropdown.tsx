import { Dispatch, SetStateAction, useState } from "react";
import Select from "react-select";
import { dropdownStyles } from "./style";

type Props = {
  options: {
    value: string;
    label: string;
  }[];
  setUsernameFilter: Dispatch<SetStateAction<string[]>>;
};

const Dropdown = ({ options, setUsernameFilter }: Props) => {
  // ==========================================================================
  // STATE / HOOKS
  // ==========================================================================

  // ==========================================================================
  // FUNCTIONS / HANDLERS
  // ==========================================================================
  const selectHandler = (selectedOptions: any) => {
    setUsernameFilter(selectedOptions.map((o: any) => o.value));
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <>
      <Select
        placeholder={"Filter by usernames (optional)"}
        styles={dropdownStyles}
        isMulti={true}
        isClearable={true}
        isSearchable={true}
        options={options}
        onChange={selectHandler}
      />
    </>
  );
};

export default Dropdown;
