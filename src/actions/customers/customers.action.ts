"use server";

import db from "@/db/db";

export async function getCustomersDetail() {
	return db.customer.findMany({
		include: {
			_count: {
				select: {
					orders: true,
				},
			},
			orders: true,
		},
	});
}
