'use server'
import db from "@/db/db";

export async function getServices() {
    return db.service.findMany();
}