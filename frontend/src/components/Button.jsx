import { twMerge } from "tailwind-merge";

export default function Button({ children, className = "", ...props }) {
	const baseClasses = `w-fit rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer`;
  
	return (
		<button className={twMerge(baseClasses, className)} {...props}>
			{children}
		</button>
	);
}
