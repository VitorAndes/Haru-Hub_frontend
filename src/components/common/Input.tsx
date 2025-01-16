import type { InputHTMLAttributes, ReactNode } from "react";

type InputProps = {
	icon?: () => ReactNode;
	onClick?: () => void;
	ref: React.Ref<HTMLInputElement>;
	errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
	icon,
	onClick,
	errorMessage,
	ref,
	...rest
}: InputProps) => {
	return (
		<div className="flex gap-2 items-center w-96 bg-slate-background/50 h-10 p-4 rounded-md outline-none backdrop-blur shadow-sm shadow-secondary border border-text/20">
			{icon?.()}
			<input ref={ref} className="w-96 bg-transparent outline-none" {...rest} />
			{errorMessage && <p>{errorMessage}</p>}
		</div>
	);
};
