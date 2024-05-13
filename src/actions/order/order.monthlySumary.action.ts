import db from "@/db/db";
import { MonthlySummary, SummaryData } from "@/types/types";

export async function calculateMonthlySummary(
	month: number,
	year: number
): Promise<MonthlySummary> {
	const previousMonth = month === 1 ? 12 : month - 1;
	const previousYear = month === 1 ? year - 1 : year;

	const totalCustomers = await getTotalCustomersForMonth(month, year);
	const totalOrderPrice = await getTotalPriceForMonth(month, year);
	const totalOrder = await getTotalOrderForMonth(month, year);
	const previousTotalOrderPrice = await getTotalPriceForMonth(
		previousMonth,
		previousYear
	);

	const order: SummaryData = calculateSummaryData(
		totalOrder,
		previousTotalOrderPrice
	);
	const income: SummaryData = calculateSummaryData(
		totalOrderPrice,
		previousTotalOrderPrice
	);
	const customers: SummaryData = calculateSummaryData(
		totalCustomers,
		await getTotalCustomersForMonth(previousMonth, previousYear)
	);

	return { order, income, customers };
}

async function getTotalPriceForMonth(
	month: number,
	year: number
): Promise<number> {
	const result = await db.order.aggregate({
		_sum: {
			total: true,
		},
		where: {
			AND: [
				{ date: { gte: new Date(year, month - 1, 1) } },
				{ date: { lt: new Date(year, month, 1) } },
			],
		},
	});

	return result._sum.total ?? 0;
}

async function getTotalCustomersForMonth(
	month: number,
	year: number
): Promise<number> {
	return db.customer.count({
		where: {
			AND: [
				{ date: { gte: new Date(year, month - 1, 1) } },
				{ date: { lt: new Date(year, month, 1) } },
			],
		},
	});
}

async function getTotalOrderForMonth(month: number, year: number) {
	return db.order.count({
		where: {
			AND: [
				{ date: { gte: new Date(year, month - 1, 1) } },
				{ date: { lt: new Date(year, month, 1) } },
			],
		},
	});
}

function calculateSummaryData(
	currentValue: number,
	previousValue: number
): SummaryData {
	const percentage =
		previousValue !== 0
			? ((currentValue - previousValue) / previousValue) * 100
			: 0;
	const isIncrease = percentage > 0;
	return { percentage, isIncrease, number: currentValue };
}
