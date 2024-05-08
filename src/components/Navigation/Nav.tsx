"use client";
import { cn } from "@/lib/utils";
import {
	IconLayoutDashboard,
	IconReceipt2,
	IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface DocksItemsType {
	label: string;
	href: string;
	icon: React.ReactNode;
}

const DocksItems: DocksItemsType[] = [
	{
		label: "Studio",
		href: "/",
		icon: <IconLayoutDashboard className="w-6 h-6" />,
	},
	{
		label: "Order",
		href: "/orders",
		icon: <IconReceipt2 className="w-6 h-6" />,
	},
	{
		label: "Customer",
		href: "/customers",
		icon: <IconUsers className="w-6 h-6" />,
	},
];

export default function Nav() {
	const pathname = usePathname().split("/")[1];

	return (
		<div className="flex flex-col bg-primary h-full p-2">
			<ul className="space-y-3">
				{DocksItems.map((item, index) => (
					<li key={index} className="w-16 h-16">
						<Link
							href={item.href}
							className={cn(
								"text-muted-foreground flex flex-col items-center w-full h-full rounded hover:bg-foreground p-[.5rem] space-y-1 transition-colors",
								pathname === item.href.split("/")[1] &&
									"text-white"
							)}
						>
							{item.icon}
							<p className="text-xs">{item.label}</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
