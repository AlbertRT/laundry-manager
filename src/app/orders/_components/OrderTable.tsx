"use client";
import { formatDate } from "@/lib/utils";
import { formatCurrency } from "@/lib/formater";
import { useRouter } from "next/navigation";
import {
	Table,
	TableBody,
	TableData,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

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

	const getOrderDetails = (orderId: string) => {
		return router.push(`/orders/?orderId=${orderId}`);
	};

	// return <Table>
	//     <TableHeader>
	//         <TableRow>
	//             <TableHead>Customer</TableHead>
	//             <TableHead className="hidden sm:table-cell">
	//                 Service
	//             </TableHead>
	//             <TableHead className="hidden sm:table-cell">
	//                 Status
	//             </TableHead>
	//             <TableHead className="hidden md:table-cell">
	//                 Date
	//             </TableHead>
	//             <TableHead className="text-right">Amount</TableHead>
	//         </TableRow>
	//     </TableHeader>

	// </Table>
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
					>
						<TableData>
							<div className="font-medium">
								{order.customer.fullname}
							</div>
							<div className="hidden text-sm text-muted-foreground md:inline">
								{order.customer.email}
							</div>
						</TableData>
						<TableData>{order.service}</TableData>
						<TableData>
							{/* <Badge className="text-xs" variant="onProgress">
								{order.status}
							</Badge> */}
						</TableData>
						<TableData>{formatDate(order.date)}</TableData>
						<TableData>{formatCurrency(order.subtotal)}</TableData>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
