export default function StepWelcome() {
	return (
		<div className="text-center">
			<img src="/placeholder-welcome.png" alt="Welcome" className="w-32 h-32 mx-auto mb-4" />
			<h2 className="text-2xl font-semibold mb-2">Welcome to Sannata</h2>
			<p className="text-muted mb-4">You’re all set to explore.</p>
			<button
				className="bg-[--color-brand] text-white px-4 py-2 rounded"
				onClick={() => (window.location.href = "/home")} // or update route/store later
			>
				Aye aye, captain
			</button>
		</div>
	);
}
