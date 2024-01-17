type Props = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const CardDark0 = ({ children, className, onClick }: Props) => {
  return (
    <div
      className={`bg-neutral-800 rounded-sm bg-[radial-gradient(65%_60%_at_50%_10%,rgba(43,43,43,0.5)_0%,rgba(30,30,30,0.5)_100%)] ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardDark1 = ({ children, className, onClick }: Props) => {
  return (
    <div
      className={`bg-neutral-700 rounded-sm bg-[radial-gradient(65%_60%_at_50%_10%,rgba(54,54,54,0.5)_0%,rgba(41,41,41,0.5)_100%)] ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardDark2 = ({ children, className, onClick }: Props) => {
  return (
    <div
      className={`bg-neutral-600 rounded-sm bg-[radial-gradient(65%_60%_at_50%_10%,rgba(54,54,54,0.5)_0%,rgba(41,41,41,0.5)_100%)] ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
