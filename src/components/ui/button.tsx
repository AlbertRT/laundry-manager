import { ButtonProps } from "@/types/types";
import { IconLoader2 } from "@tabler/icons-react";
import clsx from "clsx";
import React from "react";

export function Button({
	children,
	loading,
	loadingPlaceholder,
	isIcon,
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			className={clsx(
				"bg-[#e1e3e6] rounded hover:bg-[#b1b5b7] transition-colors disabled:bg-[#edeff0] disabled:cursor-not-allowed disabled:text-[#b1b5b7]",
				loading && "cursor-not-allowed text-[#b1b5b7] bg-[#edeff0]",
				isIcon
					? "w-10 h-10 flex items-center justify-center"
					: "w-auto h-8 px-5"
			)}
			disabled={loading || props.disabled}
		>
			{loading ? (
				loadingPlaceholder ? (
					<div className="flex items-center space-x-2">
						<IconLoader2 className="w-4 h-4 animate-spin" />
						<span className="text-sm">{loadingPlaceholder}</span>
					</div>
				) : (
					<IconLoader2 className="w-4 h-4 animate-spin" />
				)
			) : (
				children
			)}
		</button>
	);
}
