"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { LaundryService, PaymentMethod } from "@/types/types";
import { getServices } from "@/actions/service/service.action";
import { getPaymentMethod } from "@/actions/paymentMethod/paymentMethod.action";
import { createOrder } from "@/actions/order/order.action";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { BookUser, Mail, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import CustomerData from "./_components/CustomerData";
import OrderData from "./_components/OrderData";
import PaymentData from "./_components/PaymentData";

export default function page() {
	const [step, setStep] = useState<number>(3);
	const [currentStep, setCurrentStep] = useState<number>(1);

	const handleNext = (): void => setCurrentStep((prev: number) => prev + 1);
	const handlePrevious = (): void =>
		setCurrentStep((prev: number) => prev - 1);

	return (
		<div className="grid lg:gap-2 lg:grid-cols-2 px-6 sm:py-6">
			<form action={createOrder} className={"grid gap-2"}>
				{currentStep === 1 && <CustomerData />}
				{currentStep === 2 && <OrderData />}
				{currentStep === 3 && <PaymentData />}

				{currentStep === 3 ? (
					<SubmitButton />
				) : (
					<div className="flex space-x-3">
						<Button
							onClick={handlePrevious}
							disabled={currentStep < step}
						>
							Previous
						</Button>
						<Button onClick={handleNext}>Next</Button>
					</div>
				)}
			</form>
		</div>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button type={"submit"} disabled={pending}>
			{pending ? "Saving..." : "Save"}
		</Button>
	);
}
