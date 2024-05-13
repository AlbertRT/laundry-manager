import { calculateMonthlySummary } from "@/actions/order/order.monthlySumary.action";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formater";
import { IconCaretDown, IconCaretUp, IconCash } from "@tabler/icons-react";
import { formatDate } from "date-fns";

export default async function page() {
	const currentMonth = Number(formatDate(new Date(), "M"));
	const currentYear = Number(formatDate(new Date(), "yyyy"));

	const montlySummary = await calculateMonthlySummary(
		currentMonth,
		currentYear
	);
	console.log(montlySummary);

	return (
		<div className="p-6">
			<p className="font-bold text-lg">Studio</p>
			<div className="grid grid-cols-3 mt-4 gap-5">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Revenue
						</CardTitle>
						<IconCash className="w-4 h-4" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{formatCurrency(montlySummary.income.number)}
						</div>
						<div className="flex items-center space-x-1 mt-4">
							{montlySummary.income.isIncrease ? (
								<IconCaretUp className="w-4 h-4 text-green-800" />
							) : (
								<IconCaretDown className="w-4 h-4 text-red-700" />
							)}
							<p className="text-sm text-muted-foreground">
								{montlySummary.income.percentage}% this month
							</p>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Order
						</CardTitle>
						<IconCash className="w-4 h-4" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{montlySummary.order.number}
						</div>
						<div className="flex items-center space-x-1 mt-4">
							{montlySummary.order.isIncrease ? (
								<IconCaretUp className="w-4 h-4 text-green-800" />
							) : (
								<IconCaretDown className="w-4 h-4 text-red-700" />
							)}
							<p className="text-sm text-muted-foreground">
								{montlySummary.order.percentage}% this month
							</p>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Customer
						</CardTitle>
						<IconCash className="w-4 h-4" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{montlySummary.customers.number}
						</div>
						<div className="flex items-center space-x-1 mt-4">
							{montlySummary.customers.isIncrease ? (
								<IconCaretUp className="w-4 h-4 text-green-800" />
							) : (
								<IconCaretDown className="w-4 h-4 text-red-700" />
							)}
							<p className="text-sm text-muted-foreground">
								{montlySummary.customers.percentage}% this month
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
