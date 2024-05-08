import { createOrder } from "@/actions/order/order.action";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatPhoneNumber } from "@/lib/formater";
import { CustomerDataType, OrderCartType } from "@/types/types";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

type OrderPrevComp = {
	order: OrderCartType[];
	customerData: CustomerDataType;
};

export default function OrderPreview({ order, customerData }: OrderPrevComp) {
	const [orderCart, setOrderCart] = useState<OrderCartType[] | never[]>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	useEffect(() => {
		setOrderCart(order);
	}, [order]);
	useEffect(() => {
		setTotalPrice(
			orderCart.reduce((total, item) => {
				return total + item.price;
			}, 0)
		);
	}, [orderCart]);

	const onQuantityChange = (
		serviceId: string,
		action: "increase" | "decrease"
	): void => {
		const itemIndex = orderCart.findIndex((x) => x.serviceId === serviceId);

		if (itemIndex === -1) return;

		const updatedOrderCart = [...orderCart];
		const updatedItem = { ...updatedOrderCart[itemIndex] };
		let price;

		if (action === "increase") {
			updatedItem.quantity++;
		} else if (action === "decrease" && updatedItem.quantity > 0) {
			updatedItem.quantity--;
		}

		updatedItem.price =
			updatedItem.quantity * orderCart[itemIndex].defaultPrice;

		updatedOrderCart[itemIndex] = updatedItem;
		console.log(updatedOrderCart);

		setOrderCart(updatedOrderCart);
	};

	const onSubmit = async (): Promise<void> => {
		await createOrder({ order: orderCart, customer: customerData });
	};

	return (
		<Card className="w-[35%]">
			<CardHeader>
				<CardTitle>Order Preview</CardTitle>
				<CardDescription>
					Lorem ipsum dolor sit amet consectetur.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-3">
					<Label>Order Item</Label>
					{orderCart ? (
						orderCart.map((item, index) => (
							<div
								className="flex items-center justify-between"
								key={index}
							>
								<div className="flex items-center space-x-2">
									<button
										className="w-5 h-5 flex items-center justify-center hover:bg-accent rounded"
										onClick={() =>
											onQuantityChange(
												item.serviceId,
												"decrease"
											)
										}
									>
										<IconMinus className="w-3 h-3" />
									</button>
									<p className="text-muted-foreground text-sm">
										{item.name}
									</p>
									<button
										className="w-5 h-5 flex items-center justify-center hover:bg-accent rounded"
										onClick={() =>
											onQuantityChange(
												item.serviceId,
												"increase"
											)
										}
									>
										<IconPlus className="w-3 h-3" />
									</button>
								</div>
								<p className="text-sm">
									{`${item.quantity} ${item.unit}`}
								</p>
							</div>
						))
					) : (
						<p>No Item</p>
					)}
				</div>
				<Separator />
				<div className="space-y-3">
					<div className="flex flex-items justify-between text-sm">
						<p className="text-muted-foreground">Subtotal</p>
						<p>{formatCurrency(totalPrice)}</p>
					</div>
					<div className="flex flex-items justify-between text-sm">
						<p className="text-muted-foreground">Tax (10%)</p>
						<p>{formatCurrency((totalPrice * 10) / 100)}</p>
					</div>
				</div>
				<Separator />
				<div className="space-y-3">
					<Label>Customer Data</Label>
					<div className="flex flex-items justify-between text-sm">
						<p className="text-muted-foreground">Name</p>
						<p>{customerData.customerName}</p>
					</div>
					<div className="flex flex-items justify-between text-sm">
						<p className="text-muted-foreground">Email</p>
						<p>{customerData.email}</p>
					</div>
					<div className="flex flex-items justify-between text-sm">
						<p className="text-muted-foreground">Phone</p>
						<p>{formatPhoneNumber(customerData.phone)}</p>
					</div>
					<div className="flex flex-items flex-col justify-between text-sm">
						<p className="text-muted-foreground">Address</p>
						<p>{customerData.address}</p>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<Button className="w-full" onClick={onSubmit}>
					Place Order (
					{formatCurrency(totalPrice + (totalPrice * 10) / 100)})
				</Button>
			</CardFooter>
		</Card>
	);
}
