import { getCustomersDetail } from "@/actions/customers/customers.action";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatPhoneNumber } from "@/lib/formater";

export default async function page() {
	const customers = await getCustomersDetail();

	return (
		<main className="p-6 -z-10 w-full">
			<div className="w-full flex items-center justify-between mb-3">
				<p className="font-bold text-lg">Orders</p>
			</div>
			<div className="flex space-x-3">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Phone</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Address</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Total Order</TableHead>
							<TableHead>
								<span className="sr-only">Action</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{customers.map((customer) => (
							<TableRow key={customer.id}>
								<TableCell>{customer.fullname}</TableCell>
								<TableCell>
									{formatPhoneNumber(customer.phone)}
								</TableCell>
								<TableCell>{customer.email}</TableCell>
								<TableCell>
									<HoverCard>
										<HoverCardTrigger asChild>
											<p className="cursor-pointer">
												Address
											</p>
										</HoverCardTrigger>
										<HoverCardContent>
											<p>{customer.address}</p>
										</HoverCardContent>
									</HoverCard>
								</TableCell>
								<TableCell>
									{formatCurrency(
										customer.orders.reduce(
											(total, item) => {
												return total + item.total;
											},
											0
										)
									)}
								</TableCell>
								<TableCell>
									{customer._count.orders}{" "}
									{customer._count.orders > 1
										? "orders"
										: "order"}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</main>
	);
}
