"use client";
import { usePathname } from "next/navigation";
import {
	IconHome2,
	IconReceipt,
	IconUsers,
	IconPackage,
	IconSearch,
} from "@tabler/icons-react";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Kbd } from "../ui/kbd";

type SidebarLinks = {
	label: string;
	href: string;
	icon: React.ReactNode;
};

const sidebarLinks: SidebarLinks[] = [
	{
		label: "Dashboard",
		href: "/",
		icon: <IconHome2 className="w-4 h-4" />,
	},
	{
		label: "Orders",
		href: "/orders",
		icon: <IconReceipt className="w-4 h-4" />,
	},
	{
		label: "Customers",
		href: "/customers",
		icon: <IconUsers className="w-4 h-4" />,
	},
	{
		label: "Services",
		href: "/services",
		icon: <IconPackage className="w-4 h-4" />,
	},
];

export default function Sidebar() {
	const [isOpen, setOpen] = useState<boolean>(false);
	const searchInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	});

	function toggleSidebar(): void {
		setOpen(!isOpen);
	}

	function onSearchBtnClick(): void {
		setOpen(false);
		searchInputRef.current?.focus();
	}

	function handleKeyDown(e: KeyboardEvent): void {
		if (e.ctrlKey && e.key === "b") {
			toggleSidebar();
		}
		if (e.ctrlKey && e.key === "k" && isOpen) {
			toggleSidebar();
			searchInputRef.current?.focus();
		}
		if (e.ctrlKey && e.key === "k" && !isOpen) {
			searchInputRef.current?.focus();
		}
	}

	return (
		<div
			className={clsx(
				"bg-gray-100 min-h-screen relative transition-width py-5 transition-spacing",
				isOpen ? "w-[5%] px-3" : "w-1/4 px-5"
			)}
		>
			<div className="mb-4">
				{isOpen ? (
					<Button isIcon onClick={onSearchBtnClick}>
						<IconSearch className="w-4 h-4" />
					</Button>
				) : (
					<Input
						placeholder="Search..."
						leftContent={<IconSearch className="w-4 h-4" />}
						rightContent={<Kbd>ctrl + k</Kbd>}
						ref={searchInputRef}
					/>
				)}
			</div>
			<div className="space-y-4">
				<ul>
					{sidebarLinks.map((link, index) => (
						<li
							className={clsx(
								"w-full h-10 hover:bg-[#e1e3e6] rounded transition-colors relative"
							)}
							key={index}
						>
							<Link
								href={link.href}
								className="w-full h-full flex items-center px-3 group"
							>
								<div className="mr-3">{link.icon}</div>
								{isOpen ? (
									<span className="absolute left-full ml-5 bg-[#e1e3e6] p-2 rounded opacity-0 -translate-x-4 transition-all group-hover:translate-x-0 group-hover:visible group-hover:opacity-100 ">
										{link.label}
									</span>
								) : (
									link.label
								)}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div
				className="absolute bg-black w-1 h-6 rounded right-0 mr-[-1rem] top-1/2 bottom-1/2 cursor-pointer"
				onClick={toggleSidebar}
			/>
		</div>
	);
}
