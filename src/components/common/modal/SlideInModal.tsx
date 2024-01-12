import { Dispatch, SetStateAction } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const SlideInModal = ({ children, className, show, setShow }: Props) => {
  return (
    <div
      className={`fixed bottom-0 left-0 transition-all duration-300 z-10 ${
        show ? "translate-y-0" : "translate-y-full"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default SlideInModal;
