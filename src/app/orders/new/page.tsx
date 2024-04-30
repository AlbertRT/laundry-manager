'use client'

import {ChangeEvent, useEffect, useState} from "react";
import {LaundryService, PaymentMethod} from "@/types/types";
import {getServices} from "@/actions/service/service.action";
import {getPaymentMethod} from "@/actions/paymentMethod/paymentMethod.action";
import {createOrder} from "@/actions/order/order.action";
import {Separator} from "@/components/ui/separator";
import {Label} from "@/components/ui/label";
import {BookUser, Mail, Phone, User} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import { useFormStatus } from 'react-dom'

export default function page() {
    const [laundryService, setService] = useState<null | LaundryService>(null)
    const [laundryServices, setLaundryServices] = useState<null | LaundryService[]>(null)
    const [laundryValue, setLaundryValue] = useState<number>(0)
    const [paymentMethod, setPaymentMethod] = useState<null | PaymentMethod[]>(null)

    useEffect(() => {
        (async () => {
            const [service, payment] = await Promise.all([getServices(), getPaymentMethod()])
            setLaundryServices(service)
            setPaymentMethod(payment)
        })()
    }, []);

    const onLaundryValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value < 0) return
        setLaundryValue(value)
    }

    const onLaundryServiceChange = (name: string) => {
        if (!laundryServices) return
        const service: LaundryService = laundryServices.filter(items => items.name === name)[0];
        setService(service);
    }

    return <div className="grid lg:gap-2 lg:grid-cols-2 px-6 sm:py-6">
        <form action={createOrder} className={"grid gap-2"}>
            <div className="grid gap-2">
                <span className={"text-muted-foreground text-xs font-bold"}>Customer Data</span>
                <Separator/>
                <div className={"grid grid-cols-2 gap-4"}>
                    <div className={"space-y-2"}>
                        <Label htmlFor={"customerName"}
                               className={"flex items-center text-muted-foreground text-xs font-bold"}>
                            <User className={"w-4 h-4 mr-2"}/>
                            Customer Name
                        </Label>
                        <Input type={"text"} id={"customerName"} autoComplete={"off"} name={"customerName"}/>
                    </div>
                    <div className={"space-y-2"}>
                        <Label htmlFor={"email"}
                               className={"flex items-center text-muted-foreground text-xs font-bold"}>
                            <Mail className={"w-4 h-4 mr-2"}/>
                            Email
                        </Label>
                        <Input type={"email"} id={"email"} name={"email"} autoComplete={"off"}/>
                    </div>
                    <div className={"space-y-2 col-span-2"}>
                        <Label htmlFor={"address"}
                               className={"flex items-center text-muted-foreground text-xs font-bold"}>
                            <BookUser className={"w-4 h-4 mr-2"}/>
                            Address
                        </Label>
                        <Textarea id={"address"} autoComplete={"off"} name={"address"} className={"resize-none h-auto"}/>
                    </div>
                    <div className={"space-y-2 col-span-2"}>
                        <Label htmlFor={"phone"}
                               className={"flex items-center text-muted-foreground text-xs font-bold"}>
                            <Phone className={"w-4 h-4 mr-2"}/>
                            Phone Number
                        </Label>
                        <Input type={"text"} id={"phone"} name={"phone"} autoComplete={"off"}/>
                    </div>
                </div>
            </div>
            <div className={"grid gap-2"}>
                <span className={"text-muted-foreground text-xs font-bold"}>Order Data</span>
                <Separator/>
                <div className={"grid grid-cols-3 gap-3"}>
                    {laundryServices && (<Select onValueChange={onLaundryServiceChange} name={"service"}>
                        <SelectTrigger className={"col-span-2"}>
                            <SelectValue placeholder={"Service"}/>
                        </SelectTrigger>
                        <SelectContent>
                            {laundryServices.map(service => (
                                <SelectItem value={service.name} key={service.id}>{service.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>)}
                    <div className="flex items-center gap-2 col-span-1">
                        <Input type={"number"} autoComplete={"off"} placeholder={""}
                               disabled={laundryService === null}
                               value={laundryValue} onChange={onLaundryValueChange}
                               name={"quantity"}
                        />
                        {laundryService &&
                            <span className={"text-muted-foreground text-sm"}>{laundryService.unit}</span>}
                    </div>
                </div>
            </div>
            <div className="grid gap-3">
                <span className={"text-muted-foreground text-xs font-bold"}>Payment Method</span>
                <Separator/>
                {paymentMethod && (<Select name={"payment"}>
                    <SelectTrigger className={"col-span-2"}>
                        <SelectValue placeholder={"Payment"}/>
                    </SelectTrigger>
                    <SelectContent>
                        {paymentMethod.map(method => (
                            <SelectItem value={method.name}
                                        key={method.id}>{method.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>)}
            </div>
            <SubmitButton />
        </form>
    </div>
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return <Button type={"submit"} disabled={pending}>
        {pending ? ("Saving...") : ("Save")}
    </Button>
}