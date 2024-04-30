import { getPaymentMethod } from "@/actions/paymentMethod/paymentMethod.action";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PaymentMethod } from "@/types/types";
import React, { useEffect, useState } from "react";

export default function PaymentData() {
	const [paymentMethod, setPaymentMethod] = useState<null | PaymentMethod[]>(
		null
	);

	useEffect(() => {
		(async () => {
			const payment = await getPaymentMethod();
			setPaymentMethod(payment);
		})();
	}, []);

	return (
		<div className="grid gap-3">
			<span className={"text-muted-foreground text-xs font-bold"}>
				Payment Method
			</span>
			<Separator />
			{paymentMethod && (
				<Select name={"payment"}>
					<SelectTrigger className={"col-span-2"}>
						<SelectValue placeholder={"Payment"} />
					</SelectTrigger>
					<SelectContent>
						{paymentMethod.map((method) => (
							<SelectItem value={method.name} key={method.id}>
								{method.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		</div>
	);
}
