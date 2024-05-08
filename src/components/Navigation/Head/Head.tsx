import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

export default function Head() {
	return (
		<div className="h-14 bg-primary flex items-center px-4 text-white justify-between">
			<div className="flex items-center w-full space-x-4">
				<div className="w-14 h-10 bg-blue-50">a</div>
				<div className="relative w-1/4 flex items-center">
					<IconSearch className="w-4 h-4 absolute left-2" />
					<input
						type="text"
						className="outline-none border-none bg-foreground/60 rounded h-9 w-full px-8 text-sm placeholder:text-sm"
						placeholder="Search"
					/>
				</div>
			</div>
		</div>
	);
}
