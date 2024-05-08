"use client";

import { deleteOrderById, getOrderById } from "@/actions/order/order.action";
import { Badge } from "@/components/ui/badge";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatCurrency } from "@/lib/formater";
import { OrderType } from "@/types/types";
import { IconTrash, IconX } from "@tabler/icons-react";
import { format, formatDate } from "date-fns";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function OrderDetail() {
	const orderId = useSearchParams().get("orderId");
	const router = useRouter();
	const [orderData, setOrderData] = useState<OrderType>(undefined);

	useEffect(() => {
		(async () => {
			const data: OrderType = await getOrderById(orderId as string);
			setOrderData(data);
		})();

		return () => setOrderData(undefined);
	}, [orderId]);

	const onClose = (): void => {
		setOrderData(undefined);
		router.push("/orders");
	};

	return (
		orderId &&
		orderData && (
			<Card className="w-[45%]">
				<CardHeader className="bg-muted">
					<CardTitle className="text-lg flex items-center justify-between">
						<span className="font-bold select-none">
							{orderData.inv}
						</span>
						<div className="flex space-x-3">
							<DeleteData orderId={orderData.id} />
							<div
								className="w-6 h-6 flex items-center cursor-pointer justify-center"
								onClick={onClose}
							>
								<IconX className="w-4 h-4" />
							</div>
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mt-5 space-y-4">
						<div className="text-sm space-y-3 border-b-[1px] pb-4">
							<p className="font-bold">Order Detail</p>
							<div className="space-y-1">
								{orderData.orderItems.map((item, index) => (
									<div
										className="grid grid-cols-3"
										key={index}
									>
										<p className="text-muted-foreground text-start">
											{item.name}
										</p>
										<p className="text-end">
											{item.quantity} {item.unit}
										</p>
										<p className="text-end">
											{formatCurrency(item.defaultPrice)}
										</p>
									</div>
								))}
							</div>
						</div>
						<div className="text-sm space-y-3">
							<div className="grid grid-cols-2 w-full">
								<p className="text-muted-foreground">
									Subtotal
								</p>
								<p className="text-end">
									{formatCurrency(orderData.subtotal)}
								</p>
							</div>
							<div className="grid grid-cols-2 w-full">
								<p className="text-muted-foreground">Tax</p>
								<p className="text-end">
									{formatCurrency(orderData.tax)}
								</p>
							</div>
							<div className="grid grid-cols-2 w-full">
								<p className="text-muted-foreground">Payment</p>
								<p className="italic text-end">
									{orderData.payment}
								</p>
							</div>
							<div className="grid grid-cols-2 w-full font-bold">
								<p className="text-muted-foreground">Total</p>
								<p className="text-end">
									{formatCurrency(orderData.total)}
								</p>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter className="bg-muted py-4 select-none text-xs text-muted-foreground">
					<span>
						Created at{" "}
						{formatDate(
							new Date(orderData.date),
							"dd MMMM yyyy hh:MM:ss"
						)}
					</span>
				</CardFooter>
			</Card>
		)
	);
}

function DeleteData({ orderId }: { orderId: string }) {
	const onDelete = async () => {
		await deleteOrderById(orderId);
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<div className="w-6 h-6 flex items-center justify-center cursor-pointer">
					<IconTrash className="w-4 h-4 text-destructive" />
				</div>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						<p>
							This action cannot be undone. This will permanently
							delete this order data.
						</p>
						<Link
							href={"/faq"}
							className="text-black hover:underline"
						>
							Learn more
						</Link>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onDelete}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
