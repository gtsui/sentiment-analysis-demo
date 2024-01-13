export const dropdownStyles = {
  control: (base: any, state: any) => ({
    ...base,
    padding: "0 0.75rem",
    backgroundColor: "#292929",
    color: "#ffffff",
    border: state.isFocused ? "1px solid #9dd44f" : "none",
    boxShadow: "none",
    borderRadius: "0.5rem",
    "&:hover": {
      border: state.isFocused ? "1px solid #9dd44f" : 0,
    },
  }),
  input: (base: any) => ({
    ...base,
    color: "#ffffff",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#69696A",
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: "#292929",
  }),
  option: (base: any, state: any) => ({
    ...base,
    color: "#ffffff",
    backgroundColor: state.isFocused ? "#353535" : "transparent",
    ":active": {
      backgroundColor: "#353535",
    },
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "#353535",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "#9dd44f",
  }),
};
