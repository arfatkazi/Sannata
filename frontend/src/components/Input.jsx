import { twMerge } from "tailwind-merge";

export default function Input({ className = "", ...props }) {
	const baseClasses = `w-full h-16 block rounded-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`;
  
	return <input className={twMerge(baseClasses, className)} {...props} />;
}
