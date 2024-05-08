import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isMoreThan48Hour(dateBefore: Date): boolean {
	const now: Date = new Date();
	const diff = (now.getTime() - dateBefore.getTime()) / (1000 * 60 * 60);

	return diff > 48;
}

export function generateRandomLetters(length: number): string {
	let result = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
}

export function generateInvoiceNumber(): string {
	const today = new Date();
	const datePart = today
		.toLocaleDateString("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		})
		.replace(/\//g, "");
	const randomPart = Math.floor(1000 + Math.random() * 9000);
	const randomLetters = generateRandomLetters(2);
	return `INV-${datePart}-${randomPart}${randomLetters}`;
}

export function generateOrderId(): string {
	const today = new Date();
	const datePart = today
		.toLocaleDateString("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		})
		.replace(/\//g, ""); // Menghilangkan garis miring jika ada
	const timePart = today.toTimeString().slice(0, 8).replace(/:/g, ""); // Waktu hari ini tanpa detik
	return `ID${datePart}${timePart}`;
}
