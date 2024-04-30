"use client";
import { usePathname } from "next/navigation";
import classes from "@/styles/Navbar.module.css";
import {
	IconHome2,
	IconReceipt,
	IconUsers,
	IconPackage,
	IconLogout,
	IconSwitchHorizontal,
} from "@tabler/icons-react";
import { Center, Tooltip, UnstyledButton, Stack, rem } from "@mantine/core";
import { useState } from "react";
import Link from "next/link";

const sidebarLinks = [
	{
		label: "Dashboard",
		href: "/",
		icon: IconHome2,
	},
	{
		label: "Orders",
		href: "/orders",
		icon: IconReceipt,
	},
	{
		label: "Customers",
		href: "/customers",
		icon: IconUsers,
	},
	{
		label: "Services",
		href: "/services",
		icon: IconPackage,
	},
];

type NavbarLinkProps = {
	icon: typeof IconHome2;
	label: string;
	active?: boolean;
	onClick?(): void;
	href: string;
};

function NavbarLink({
	icon: Icon,
	label,
	active,
	onClick,
	href,
}: NavbarLinkProps) {
	return (
		<Tooltip
			label={label}
			position="right"
			transitionProps={{ duration: 0 }}
		>
			<Link
				onClick={onClick}
				className={classes.link}
				data-active={active || undefined}
				href={href}
			>
				<Icon
					style={{ width: rem(20), height: rem(20) }}
					stroke={1.5}
				/>
			</Link>
		</Tooltip>
	);
}

export default function Sidebar() {
	const pathname = usePathname();
	const [active, setActive] = useState(2);

	const links = sidebarLinks.map((link, index) => (
		<NavbarLink
			{...link}
			key={link.label}
			active={index === active}
			href={link.href}
			onClick={() => setActive(index)}
		/>
	));

	return (
		<nav className={classes.navbar}>
			<Center>
				{/* <MantineLogo type="mark" size={30} /> */}
				<div>logo</div>
			</Center>

			<div className={classes.navbarMain}>
				<Stack justify="center" gap={0}>
					{links}
				</Stack>
			</div>
		</nav>
	);
}
