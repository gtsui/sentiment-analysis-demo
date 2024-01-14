import { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import { IUser } from "@/src/types/types";
import { dropdownStyles } from "./style";

type Props = {
  options: {
    value: string;
    label: string;
  }[];
  setUserFilter: Dispatch<SetStateAction<IUser[]>>;
};

const Dropdown = ({ options, setUserFilter }: Props) => {
  // ==========================================================================
  // STATE / HOOKS
  // ==========================================================================

  // ==========================================================================
  // FUNCTIONS / HANDLERS
  // ==========================================================================
  const selectHandler = (selectedOptions: any) => {
    setUserFilter(
      selectedOptions.map((o: any) => {
        return { username: o.value, displayName: o.label };
      })
    );
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
