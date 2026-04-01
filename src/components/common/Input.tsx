import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";

type InputProps = {
  ref?: React.Ref<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ ...rest }: InputProps) => {
  return (
    <div className="flex gap-2 items-center w-52 h-8 lg:w-80 bg-primary/25 lg:h-10 p-2 rounded-md outline-none backdrop-blur-sm shadow-sm shadow-secondary focus-within:bg-secondary/25 focus-within:shadow-primary transition-all duration-300">
      <Search className="size-4 lg:size-6 flex-shrink-0" />
      <input
        className="font-paragraph text-xs lg:text-base lg:w-80 bg-transparent outline-none"
        {...rest}
      />
    </div>
  );
};
