'use server'
import {z} from 'zod'
import {generateID} from "@/lib/utils";
import db from "@/db/db";
import {redirect, RedirectType} from "next/navigation";
import {revalidatePath} from "next/cache";

const createOrderSchema = z.object({
    id: z.string().min(1),
    customerName: z.string().min(1),
    email: z.string().min(1),
    phone: z.string().min(1),
    address: z.string().min(1),
    service: z.string().min(1),
    subtotal: z.coerce.number().int().min(1),
    tax: z.coerce.number().int().min(1),
    total: z.coerce.number().int().min(1),
    payment: z.string().min(1),
})

export async function createOrder(formData: FormData) {
    try {
        const laundryServiceData = await db.service.findFirst({
            where: {
                name: formData.get("service") as string
            }
        });
        const paymentData = await db.payment.findFirst({
            where: {
                name: formData.get("payment") as string
            }
        })

        if (!laundryServiceData || !paymentData) throw new Error("Something went wrong");

        const subtotal = Number(formData.get("quantity")) * laundryServiceData.price
        const tax = (10 / 100) * subtotal

        const raw = {
            id: generateID(),
            customerName: formData.get("customerName") as string,
            service: formData.get("service") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            address: formData.get("address") as string,
            subtotal,
            tax,
            total: subtotal + tax,
            payment: formData.get("payment") as string
        }

        const result = createOrderSchema.safeParse(raw)

        if (!result.success) {
            console.log(result.error)

            return result.error.formErrors.fieldErrors
        }

        const { id, payment, customerName, service, email, phone, address } = result.data

        await db.order.create({
            data: {
                id,
                service,
                subtotal,
                tax,
                total: subtotal + tax,
                payment,
                quantity: Number(formData.get("quantity")),
                customer: {
                    connectOrCreate: {
                        where: {
                            email
                        },
                        create: {
                            fullname: customerName,
                            email,
                            phone,
                            address
                        }
                    }
                }
            }
        })

    } catch (error) {
        console.log(error)
    }
        revalidatePath("/orders")
        redirect("/orders", RedirectType.push)
}

export async function getOrderById(id: string) {
    if (!id) return

    const data = await db.order.findUnique({ where: { id }, select: {
        id: true,
            customer: true,
            payment: true,
            service: true,
            subtotal: true,
            total: true,
            tax: true,
            date: true,
            quantity: true,
            status: true,
            updatedAt: true
        } })

    if (!data) return

    return data

}