import { LoaderCircle } from "lucide-react";

export default function Loading() {
	return (
		<div
			className={
				"bg-white w-full h-screen flex items-center justify-center"
			}
		>
			<LoaderCircle className="w-5 h-5 animate-spin" />
		</div>
	);
}
