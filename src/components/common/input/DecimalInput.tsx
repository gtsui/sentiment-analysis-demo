import { Dispatch, SetStateAction } from "react";

type Props = {
  className?: string;
  label?: string;
  decimalInput: string;
  setDecimalInput: Dispatch<SetStateAction<string>>;
};

const DecimalInput = ({
  className,
  label,
  decimalInput,
  setDecimalInput,
}: Props) => {
  // ==========================================================================
  // FUNCTIONS / HANDLERS
  // ==========================================================================
  const validateDecimalInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedInput = e.target.value.replace(/[^0-9.]|\.(?=.*\.)/g, "");
    setDecimalInput(formattedInput);
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <div className="relative">
      <input
        className={`${className}`}
        placeholder={"Qty"}
        type={"number"}
        inputMode={"decimal"}
        name={"search"}
        value={decimalInput}
        onInput={validateDecimalInput}
      />
      <div className="text-sh5 text-contrast-medium absolute right-5 top-[50%] -translate-y-[50%] items-center justify-center select-none">
        {label}
      </div>
    </div>
  );
};

export default DecimalInput;
