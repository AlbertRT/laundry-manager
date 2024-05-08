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
import { format } from "date-fns";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderDetail() {
	const orderId = useSearchParams().get("orderId");
	const router = useRouter();
	const [orderData, setOrderData] = useState<OrderType | null>(null);

	useEffect(() => {
		(async () => {
			const data: OrderType = await getOrderById(orderId as string);
			setOrderData(data);
		})();

		return () => setOrderData(null);
	}, [orderId]);

	const onClose = (): void => {
		setOrderData(null);
		router.push("/orders");
	};

	return (
		orderId &&
		orderData && (
			<div className="w-[45%] border-[1px] rounded">
				<div className="w-full flex justify-between bg-muted p-5">
					<div className="block">
						<div className="flex items-center space-x-3">
							<p className="font-bold select-none">
								{orderData.id}
							</p>
							<Badge className="cursor-default">
								{orderData.status}
							</Badge>
						</div>
						<p className="text-muted-foreground text-sm">
							{format(new Date(orderData.date), "dd MMMM yyyy")}
						</p>
					</div>
					<div className="flex space-x-3">
						<DeleteData orderId={orderData.id} />
						<div
							className="w-6 h-6 flex items-center cursor-pointer justify-center"
							onClick={onClose}
						>
							<IconX className="w-4 h-4" />
						</div>
					</div>
				</div>
				<div className="p-5 space-y-4">
					<div className="text-sm space-y-3 border-b-[1px] pb-4">
						<p className="font-bold">Order Detail</p>
						<div className="flex justify-between text-muted-foreground">
							<p>
								{orderData.service} ({orderData.quantity}x)
							</p>
							<p>{formatCurrency(orderData.subtotal)}</p>
						</div>
					</div>
					<div className="text-sm space-y-3 border-b-[1px] pb-4">
						<div className="flex justify-between">
							<p className="text-muted-foreground">Subtotal</p>
							<p>{formatCurrency(orderData.subtotal)}</p>
						</div>
						<div className="flex justify-between">
							<p className="text-muted-foreground">Tax</p>
							<p>{formatCurrency(orderData.tax)}</p>
						</div>
						<div className="flex justify-between">
							<p className="text-muted-foreground">Payment</p>
							<p className="italic">{orderData.payment}</p>
						</div>
						<div className="flex justify-between font-bold">
							<p className="text-muted-foreground">Total</p>
							<p>{formatCurrency(orderData.total)}</p>
						</div>
					</div>
					<div className="text-sm space-y-3 pb-4">
						<p className="font-bold">Customer Detail</p>
						<div className="flex justify-between">
							<p className="text-muted-foreground">Name</p>
							<p className="font-bold">
								{orderData.customer.fullname}
							</p>
						</div>
						<div className="flex justify-between">
							<p className="text-muted-foreground">Email</p>
							<p className="font-bold">
								{orderData.customer.email}
							</p>
						</div>
						<div className="flex justify-between">
							<p className="text-muted-foreground">Phone</p>
							<p className="font-bold">
								{orderData.customer.phone}
							</p>
						</div>
					</div>
				</div>
			</div>
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
