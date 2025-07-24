import type { InputHTMLAttributes, ReactNode } from "react";

type InputProps = {
  icon?: () => ReactNode;
  onClick?: () => void;
  ref?: React.Ref<HTMLInputElement>;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ icon, onClick, errorMessage, ...rest }: InputProps) => {
  return (
    <div className="flex gap-2 items-center w-96 bg-primary/25 h-14 px-5 py-5 rounded-md outline-none backdrop-blur-sm shadow-md shadow-secondary focus-within:bg-secondary/70 transition-all">
      {icon?.()}
      <input
        className="font-paragraph w-96 bg-transparent outline-none"
        {...rest}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};
