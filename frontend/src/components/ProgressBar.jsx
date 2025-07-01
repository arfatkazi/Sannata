export default function ProgressBar({ step, total }) {
	return (
		<div className="flex justify-center gap-2 my-3">
			{Array.from({ length: total }, (_, i) => i + 1).map((n) => (
				<div key={n} className={`h-2 w-8 rounded ${n <= Math.floor(step) ? "bg-blue-500" : "bg-gray-300"}`} />
			))}
		</div>
	);
}
