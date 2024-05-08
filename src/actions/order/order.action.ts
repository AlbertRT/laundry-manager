"use server";
import { date, z } from "zod";
// import { generateID } from "@/lib/utils";
import db from "@/db/db";
import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
	generateInvoiceNumber,
	generateOrderId,
	generateRandomLetters,
	isMoreThan48Hour,
} from "@/lib/utils";
import { CustomerDataType, OrderCartType } from "@/types/types";

interface OrderData extends OrderCartType {
	subtotal: number;
	tax: number;
	total: number;
}

export async function createOrder(data: {
	order: OrderCartType[];
	customer: CustomerDataType;
}) {
	// pricing

	const subtotal: number = data.order.reduce(
		(total, item) => total + item.price,
		0
	);
	const tax: number = subtotal * 0.1;
	const customerId = generateRandomLetters(8);
	const invNumb = generateInvoiceNumber();
	const orderId = generateOrderId();

	try {
		await db.order.create({
			data: {
				id: orderId,
				inv: invNumb,
				subtotal,
				tax,
				total: subtotal + tax,
				payment: "Cash",
				customer: {
					connectOrCreate: {
						where: { email: data.customer.email },
						create: {
							id: customerId,
							fullname: data.customer.customerName,
							email: data.customer.email,
							phone: data.customer.phone,
							address: data.customer.address,
						},
					},
				},
			},
		});

		for (const item of data.order) {
			await db.orderItem.create({
				data: {
					orderId,
					serviceId: item.serviceId,
					name: item.name,
					price: item.price,
					defaultPrice: item.defaultPrice,
					quantity: item.quantity,
					unit: item.unit as string,
				},
			});
		}
	} catch (error) {
		console.log(error);
	}

	revalidatePath("/orders");
	redirect("/orders", RedirectType.push);
}

export async function getOrderById(id: string) {
	if (!id) return;

	const data = await db.order.findUnique({
		where: { id },
		select: {
			id: true,
			inv: true,
			customer: true,
			payment: true,
			subtotal: true,
			total: true,
			tax: true,
			date: true,
			status: true,
			updatedAt: true,
			orderItems: true,
		},
	});

	if (!data) return;

	return data;
}

export async function deleteOrderById(id: string) {
	if (!id) throw new Error("ID Not found or not Valid!");

	const data = await db.order.findUnique({ where: { id } });
	if (!data)
		throw new Error(`Data with id:${id} not found, please enter valid ID`);

	if (isMoreThan48Hour(new Date(data.date)))
		throw new Error(
			"This data cannot be deleted because is more than 48 hour since the data where inputed to the database."
		);

	const deletedData = await db.order.delete({ where: { id } });

	revalidatePath("/orders");
	redirect("/orders", RedirectType.push);
}
