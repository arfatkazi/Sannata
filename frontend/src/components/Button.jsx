import { twMerge } from "tailwind-merge";

export default function Button({ children, className = "", ...props }) {
	return (
		<button
			className={twMerge(
				`w-full h-12 rounded-full bg-(--color-primary) px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer text-nowrap`,
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}
