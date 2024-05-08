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
