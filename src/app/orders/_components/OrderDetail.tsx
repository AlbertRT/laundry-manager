'use client'

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Copy, CreditCard, MoreVertical} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Separator} from "@/components/ui/separator";
import {formatCurrency} from "@/lib/formater";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {getOrderById} from "@/actions/order/order.action";
import {format} from "date-fns";

type OrderType = {
    id: string
    service: string
    status: string
    payment: string
    date: Date
    subtotal: number
    quantity: number
    tax: number
    total: number
    customer: {
        id: string
        fullname: string
        email: string
        phone: string
        address: string
    }
    updatedAt: Date
} | undefined

export default function OrderDetail() {
    const [orderData, setOrderData] = useState<undefined | OrderType>(undefined)
    const searchParams = useSearchParams().get("orderId");

    useEffect(() => {
        (async () => {
           const data: OrderType = await getOrderById(searchParams as string)
            console.log(data)
           setOrderData(data)
        })()
    }, [searchParams]);


    return orderData && <Card
        className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
    >
        <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg select-none">
                    {orderData.id}
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                        <Copy className="h-3 w-3"/>
                        <span className="sr-only">Copy Order ID</span>
                    </Button>
                </CardTitle>
                <CardDescription>Date: {format(new Date(orderData.date), 'dd MMM yyyy')}</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="outline" className="h-8 w-8">
                            <MoreVertical className="h-3.5 w-3.5"/>
                            <span className="sr-only">More</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Export</DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Trash</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
                <div className="font-semibold">Order Details</div>
                <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {orderData.service} <span>({orderData.quantity})</span>
                      </span>
                        <span>{formatCurrency(orderData.subtotal)}</span>
                    </li>
                </ul>
                <Separator className="my-2"/>
                <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatCurrency(orderData.subtotal)}</span>
                    </li>
                    <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Tax (10%)</span>
                        <span>{formatCurrency(orderData.tax)}</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                        <span className="text-muted-foreground">Total</span>
                        <span>{formatCurrency(orderData.total)}</span>
                    </li>
                </ul>
            </div>
            <Separator className="my-4"/>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                    <div className="font-semibold">Shipping Information</div>
                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                        {orderData.customer.address}
                    </address>
                </div>
                <div className="grid auto-rows-max gap-3">
                    <div className="font-semibold">Billing Information</div>
                    <div className="text-muted-foreground">
                        Same as shipping address
                    </div>
                </div>
            </div>
            <Separator className="my-4"/>
            <div className="grid gap-3">
                <div className="font-semibold">Customer Information</div>
                <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Customer</dt>
                        <dd>{orderData.customer.fullname}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Email</dt>
                        <dd>
                            <a href="mailto:">{orderData.customer.email}</a>
                        </dd>
                    </div>
                    <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Phone</dt>
                        <dd>
                            <a href="tel:">{orderData.customer.phone}</a>
                        </dd>
                    </div>
                </dl>
            </div>
            <Separator className="my-4"/>
            <div className="grid gap-3">
                <div className="font-semibold">Payment Information</div>
                <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                        <dt className="flex items-center gap-1 text-muted-foreground">
                            <CreditCard className="h-4 w-4"/>
                            {orderData.payment}
                        </dt>
                    </div>
                </dl>
            </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
                Updated <time dateTime={format(new Date(orderData.updatedAt), 'dd-MM-yyyy')}>{format(new Date(orderData.updatedAt), 'dd MMMM yyyy')}</time>
            </div>
        </CardFooter>
    </Card>
}