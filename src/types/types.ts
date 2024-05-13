import React from "react";

export type LaundryService = {
	id: string;
	name: string;
	price: number;
	unit?: string | null;
};

export type PaymentMethod = {
	id: string;
	name: string;
	provider: string;
};

export type OrderType =
	| {
			id: string;
			inv: string;
			status: string;
			payment: string;
			date: Date;
			subtotal: number;
			tax: number;
			total: number;
			updatedAt: Date;
			customer: {
				id: string;
				fullname: string;
				email: string;
				phone: string;
				address: string;
			};
			orderItems: IOrderItem[];
	  }
	| undefined;

export interface IOrderItem extends OrderCartType {
	orderId: string;
}

export type OrderCartType = {
	serviceId: string;
	name: string;
	quantity: number;
	price: number;
	defaultPrice: number;
	unit?: string;
};

export type CustomerDataType = {
	customerName: string;
	email: string;
	phone: string;
	address: string;
};

export interface MonthlySummary {
	order: SummaryData;
	income: SummaryData;
	customers: SummaryData;
}

export interface SummaryData {
	percentage: number;
	isIncrease: boolean;
	number: number;
}
