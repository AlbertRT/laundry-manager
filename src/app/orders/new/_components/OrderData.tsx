import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getPaymentMethod } from "@/actions/paymentMethod/paymentMethod.action";
import { getServices } from "@/actions/service/service.action";
import { LaundryService } from "@/types/types";

export default function OrderData() {
	const [laundryService, setService] = useState<null | LaundryService>(null);
	const [laundryServices, setLaundryServices] = useState<
		null | LaundryService[]
	>(null);
	const [laundryValue, setLaundryValue] = useState<number>(0);

	useEffect(() => {
		(async () => {
			const [service] = await Promise.all([getServices()]);
			setLaundryServices(service);
		})();
	}, []);

	const onLaundryValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		if (value < 0) return;
		setLaundryValue(value);
	};

	const onLaundryServiceChange = (name: string) => {
		if (!laundryServices) return;
		const service: LaundryService = laundryServices.filter(
			(items) => items.name === name
		)[0];
		setService(service);
	};

	return (
		<div className={"grid gap-2"}>
			<span className={"text-muted-foreground text-xs font-bold"}>
				Order Data
			</span>
			<Separator />
			<div className={"grid grid-cols-3 gap-3"}>
				{laundryServices && (
					<Select
						onValueChange={onLaundryServiceChange}
						name={"service"}
					>
						<SelectTrigger className={"col-span-2"}>
							<SelectValue placeholder={"Service"} />
						</SelectTrigger>
						<SelectContent>
							{laundryServices.map((service) => (
								<SelectItem
									value={service.name}
									key={service.id}
								>
									{service.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
				<div className="flex items-center gap-2 col-span-1">
					<Input
						type={"number"}
						autoComplete={"off"}
						placeholder={""}
						disabled={laundryService === null}
						value={laundryValue}
						onChange={onLaundryValueChange}
						name={"quantity"}
					/>
					{laundryService && (
						<span className={"text-muted-foreground text-sm"}>
							{laundryService.unit}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
