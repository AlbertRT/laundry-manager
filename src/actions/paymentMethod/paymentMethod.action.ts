'use server'

import db from "@/db/db";

export async function getPaymentMethod() {
    return db.payment.findMany();
}