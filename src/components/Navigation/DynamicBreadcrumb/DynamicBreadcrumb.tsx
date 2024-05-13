"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type BreadcrumbItem = {
	pathnames: string[];
	pathname: string;
	index: number;
};

export default function DyanamicBreadcrumb() {
	const pathnames: string[] = usePathname()
		.split("/")
		.filter((x) => x);

	return (
		<Breadcrumb className="hidden md:flex">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/">Studio</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				{pathnames.length >= 1 && <BreadcrumbSeparator />}
				{pathnames.map((pathname, index) => (
					<BreadCrumbItem
						pathnames={pathnames}
						pathname={pathname}
						index={index}
						key={index}
					/>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

const BreadCrumbItem = ({ pathnames, pathname, index }: BreadcrumbItem) => {
	const isLast: boolean = index === pathnames.length - 1;
	const url: string = `/${pathnames.slice(0, index + 1).join("/")}`;

	return (
		<BreadcrumbItem key={index}>
			{!isLast ? (
				<>
					<BreadcrumbLink asChild>
						<Link href={url}>
							{pathname.charAt(0).toUpperCase() +
								pathname.slice(1)}
						</Link>
					</BreadcrumbLink>
					<BreadcrumbSeparator />
				</>
			) : (
				<BreadcrumbLink asChild>
					<span
						className={"cursor-default text-black hover:text-black"}
					>
						{pathname.charAt(0).toUpperCase() + pathname.slice(1)}
					</span>
				</BreadcrumbLink>
			)}
		</BreadcrumbItem>
	);
};
