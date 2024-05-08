"use client";
import { formatCurrency } from "@/lib/formater";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type OrderType = {
	id: string;
	service: string;
	status: string;
	payment: string;
	date: Date;
	subtotal: number;
	customer: {
		id: string;
		fullname: string;
		email: string;
		phone: string;
		address: string;
	};
}[];

export function OrderTable({ orders }: { orders: OrderType }) {
	const router = useRouter();
	const param = useSearchParams().get("orderId");

	const getOrderDetails = (orderId: string) => {
		return router.push(`/orders?orderId=${orderId}`);
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Customer</TableHead>
					<TableHead>Service</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Date</TableHead>
					<TableHead>Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders.map((order) => (
					<TableRow
						key={order.id}
						onClick={() => getOrderDetails(order.id)}
						className={cn(
							"cursor-pointer",
							param === order.id && "bg-accent"
						)}
					>
						<TableCell>
							<div className="font-medium">
								{order.customer.fullname}
							</div>
							<div className="hidden text-sm text-muted-foreground md:inline">
								{order.customer.email}
							</div>
						</TableCell>
						<TableCell>{order.service}</TableCell>
						<TableCell>
							<Badge
								className="text-xs cursor-default"
								variant="default"
							>
								{order.status}
							</Badge>
						</TableCell>
						<TableCell>
							{format(new Date(order.date), "dd MMMM yyyy")}
						</TableCell>
						<TableCell>{formatCurrency(order.subtotal)}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
