"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
	const path = usePathname();
	const links = [
		{
			name: "General",
			href: "/settings",
		},
		{
			name: "Security",
			href: "/settings/security",
		},
	];

	return (
		<nav
			className="grid gap-4 text-sm text-muted-foreground"
			x-chunk="dashboard-04-chunk-0"
		>
			{links.map((link, index) => (
				<Link
					href={link.href}
					className={
						path === link.href ? "font-semibold text-primary" : ""
					}
				>
					{link.name}
				</Link>
			))}
		</nav>
	);
}
