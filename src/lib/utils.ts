import { type ClassValue, clsx } from "clsx";
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

export function generateRandomLetters(length: number): string {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += letters.charAt(Math.floor(Math.random() * letters.length));
	}
	return result;
}

export function generateID(): string {
	const currentDate = new Date();
	const year = currentDate.getFullYear().toString().substr(-2);
	const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
	const date = ("0" + currentDate.getDate()).slice(-2);
	const hours = ("0" + currentDate.getHours()).slice(-2);
	const minutes = ("0" + currentDate.getMinutes()).slice(-2);
	const randomLetters = generateRandomLetters(2);

	const id = `${date}${month}${year}${hours}${minutes}${randomLetters}`;
	return id;
}

export function formatDate(date: Date): string {
	const dateTime = new Date(date);

	return `${dateTime.getDate()}/${
		dateTime.getMonth() + 1
	}/${dateTime.getFullYear()}`;
}
