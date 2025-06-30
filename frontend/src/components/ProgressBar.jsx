export default function ProgressBar({ step }) {
	return (
		<div className="flex justify-center gap-2 my-3">
			{[1, 2, 3, 4, 5].map((n) => (
				<div key={n} className={`h-2 w-8 rounded ${n <= step ? "bg-blue-500" : "bg-gray-300"}`} />
			))}
		</div>
	);
}
