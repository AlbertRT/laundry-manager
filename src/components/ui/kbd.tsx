import { KbdProps } from "@/types/types";

export function Kbd({ children }: KbdProps) {
	return (
		<kbd className="select-none text-xs bg-gray-200 px-1 py-[0.2rem] rounded">
			{children}
		</kbd>
	);
}
