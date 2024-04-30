'use client'

import Link from "next/link";
import {Box, Home, Package2, Users} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

const sidebarLinks = [
    {
        label: "Dashboard",
        href: "/",
        icon: () => <Home className="h-4 w-4"/>
    },
    {
        label: "Orders",
        href: "/orders",
        icon: () => <Box className="h-4 w-4"/>
    },
    {
        label: "Customers",
        href: "/customers",
        icon: () => <Users className="h-4 w-4"/>
    }
]


export default function Sidebar() {

    const pathname = usePathname()

    return <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
                href="/"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
                <Package2 className="h-4 w-4 transition-all group-hover:scale-110"/>
                <span className="sr-only">Acme Inc</span>
            </Link>
            <TooltipProvider>
                {sidebarLinks.map((link, i) => (
                    <Tooltip key={i}>
                        <TooltipTrigger asChild>
                            <Link
                                href={link.href}
                                className={cn("flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8", pathname === link.href ? "bg-primary-foreground text-primary" : "text-muted-foreground")}
                            >
                                {link.icon()}
                                <span className="sr-only">{link.label}</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">{link.label}</TooltipContent>
                    </Tooltip>
                ))}

            </TooltipProvider>
        </nav>
    </aside>
}