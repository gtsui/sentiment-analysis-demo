import { ClipLoader } from "react-spinners";

type Props = {
  className?: string;
  color?: string;
  size?: number;
};

export const Loading = ({ className, color, size }: Props) => {
  return (
    <div className={`flex flex-row justify-center ${className}`}>
      <ClipLoader color={color ?? "#9dd44f"} size={size} />
    </div>
  );
};
