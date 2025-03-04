import type { InputHTMLAttributes, ReactNode } from "react";

type InputProps = {
	icon?: () => ReactNode;
	onClick?: () => void;
	ref?: React.Ref<HTMLInputElement>;
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
		<div className="flex gap-2 items-center w-96 bg-aside/50 h-10 px-5 py-6 rounded-2xl outline-none backdrop-blur-sm shadow-md shadow-secondary border border-slate-500">
			{icon?.()}
			<input ref={ref} className="w-96 bg-transparent outline-none" {...rest} />
			{errorMessage && <p>{errorMessage}</p>}
		</div>
	);
};
