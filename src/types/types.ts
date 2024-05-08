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
			service: string;
			status: string;
			payment: string;
			date: Date;
			subtotal: number;
			quantity: number;
			tax: number;
			total: number;
			customer: {
				id: string;
				fullname: string;
				email: string;
				phone: string;
				address: string;
			};
			updatedAt: Date;
	  }
	| undefined;

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
