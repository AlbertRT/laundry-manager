"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function NotFound() {
	const pathname = usePathname();
	return (
		<div className="w-full h-screen absolute bg-white z-10 top-0 left-0 flex items-center justify-center text-lg">
			<div className="space-y-3">
				<div className="flex items-center space-x-4">
					<div className="border-r-[1px] border-primary pr-4">
						<p className="font-bold">404</p>
					</div>
					<p>Not Found</p>
				</div>
				<div className="flex items-center space-x-3 text-sm text-muted-foreground select-none">
					<code>{pathname}</code>
				</div>
			</div>
		</div>
	);
}
