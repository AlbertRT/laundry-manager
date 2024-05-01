import { IconLoader2 } from "@tabler/icons-react";

export default function Loading() {
	return (
		<div
			className={
				"bg-gray-100 absolute w-full h-screen flex items-center justify-center z-10 pointer-events-none"
			}
		>
			<IconLoader2 className="w-5 h-5 animate-spin" />
		</div>
	);
}
