import Link from "next/link";
import db from "@/db/db";
import { OrderTable } from "./_components/OrderTable";
import OrderDetail from "./_components/OrderDetail";
import { Button } from "@/components/ui/button";

async function getOrder() {
	return db.order.findMany({
		select: {
			id: true,
			customer: true,
			date: true,
			status: true,
			subtotal: true,
			payment: true,
		},
	});
}

export default async function page() {
	const [orderLists] = await Promise.all([getOrder()]);

	return (
		<main className="p-6 -z-10 w-full">
			<div className="w-full flex items-center justify-between mb-3">
				<p className="font-bold text-lg">Orders</p>
				<Button asChild className="bg-primary">
					<Link href={"/orders/new"}>New Order</Link>
				</Button>
			</div>
			<div className="flex space-x-3">
				<OrderTable orders={orderLists} />
				<OrderDetail />
			</div>
		</main>
	);
}
