// import OrderDetail from "@/app/orders/_components/OrderDetail";
import Link from "next/link";
import db from "@/db/db";
import { OrderTable } from "./_components/OrderTable";
// import { OrderTable } from "@/app/orders/_components/OrderTable";

async function getOrder() {
	return db.order.findMany({
		select: {
			id: true,
			customer: true,
			service: true,
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
		// <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
		// 	<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
		// 		<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
		// 			<Card
		// 				className="sm:col-span-2"
		// 				x-chunk="dashboard-05-chunk-0"
		// 			>
		// 				<CardHeader className="pb-3">
		// 					<CardTitle>Your Orders</CardTitle>
		// 					<CardDescription className="max-w-lg text-balance leading-relaxed">
		// 						Introducing Our Dynamic Orders Dashboard for
		// 						Seamless Management and Insightful Analysis.
		// 					</CardDescription>
		// 				</CardHeader>
		// 				<CardFooter>
		// 					<Button asChild>
		// 						<Link href={"/orders/new"}>
		// 							Create New Order
		// 						</Link>
		// 					</Button>
		// 				</CardFooter>
		// 			</Card>
		// 		</div>
		// 		<Card x-chunk="dashboard-05-chunk-3">
		// 			<CardHeader className="px-7">
		// 				<CardTitle>Orders</CardTitle>
		// 				<CardDescription>
		// 					Recent orders from your store.
		// 				</CardDescription>
		// 			</CardHeader>
		// 			<CardContent>
		// 				<OrderTable orders={orderLists} />
		// 			</CardContent>
		// 		</Card>
		// 	</div>
		// 	<OrderDetail />
		// 	order
		// </main>
		<main className="px-6 py-5 w-full">
			<OrderTable orders={orderLists} />
		</main>
	);
}
