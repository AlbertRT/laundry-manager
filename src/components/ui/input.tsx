import clsx from "clsx";
import React, { forwardRef } from "react";
import { InputProps } from "@/types/types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ leftContent, rightContent, ...props }, ref) => {
		return (
			<div className="relative flex items-center">
				<div className="absolute ml-2">{leftContent}</div>
				<input
					{...props}
					className={clsx(
						"w-full h-9 py-3 rounded text-sm transition-colors disabled:cursor-not-allowed focus:outline-gray-200",
						leftContent ? "px-8" : "px-4"
					)}
					ref={ref}
				/>
				<div className="absolute right-0 mr-2">{rightContent}</div>
			</div>
		);
	}
);
