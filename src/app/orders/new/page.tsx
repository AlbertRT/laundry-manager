"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
	CustomerDataType,
	LaundryService,
	OrderCartType,
	PaymentMethod,
} from "@/types/types";
import { getServices } from "@/actions/service/service.action";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import OrderPreview from "../_components/OrderPreview";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function page() {
	const [serviceLists, getServiceLists] = useState<LaundryService[] | null>(
		null
	);
	const [orderCart, setOrderCart] = useState<OrderCartType[] | never[]>([]);
	const [customerData, setCustomerData] = useState<CustomerDataType>({
		customerName: "",
		email: "",
		phone: "",
		address: "",
	});

	useEffect(() => {
		(async () => {
			const [servicesData] = await Promise.all([getServices()]);
			getServiceLists(servicesData);
		})();
	}, []);

	const onCustomerDataInput = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const name = e.target.name;
		const value = e.target.value;

		setCustomerData((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const onAdd = (serviceId: string) => {
		if (!serviceLists) return;
		const service = serviceLists.find((x) => x.id === serviceId);

		const cartItem: OrderCartType = {
			serviceId: service?.id as string,
			name: service?.name as string,
			price: service?.price as number,
			defaultPrice: service?.price as number,
			unit: service?.unit as string,
			quantity: 1,
		};
		setOrderCart((prev) => [...prev, cartItem]);
	};

	return (
		<div className="p-6">
			<div className="flex items-center justify-between mb-5">
				<p className="font-bold text-lg">Create Order</p>
				<div className="flex items-center space-x-3">
					<Button variant={"outline"} asChild>
						<Link href={"/orders"}>Discard</Link>
					</Button>
				</div>
			</div>
			<div className="flex space-x-5">
				<div className="w-[65%] space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Customer Data</CardTitle>
							<CardDescription>
								Lorem ipsum dolor sit amet consectetur.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4 grid grid-col-2 gap-4">
							<Input
								type="text"
								name="customerName"
								placeholder="Customer Name"
								autoComplete="off"
								className="col-span-2"
								onChange={onCustomerDataInput}
							/>
							<Input
								type="email"
								name="email"
								placeholder="Email"
								autoComplete="off"
								onChange={onCustomerDataInput}
							/>
							<Input
								type="text"
								name="phone"
								placeholder="Phone Number"
								onChange={onCustomerDataInput}
							/>
							<Textarea
								name="address"
								placeholder="Customer Address"
								className="resize-none col-span-2"
								onChange={onCustomerDataInput}
							/>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Order Data</CardTitle>
							<CardDescription>
								Lorem, ipsum dolor sit amet consectetur
								adipisicing.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-3 gap-3">
								{serviceLists &&
									serviceLists.map((service) => (
										<Button
											key={service.id}
											variant={"outline"}
											onClick={() => onAdd(service.id)}
										>
											{service.name}
										</Button>
									))}
							</div>
						</CardContent>
					</Card>
				</div>
				<OrderPreview order={orderCart} customerData={customerData} />
			</div>
		</div>
	);
}
