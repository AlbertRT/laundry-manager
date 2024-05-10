export const formatCurrency = (amount: number): string =>
	new Intl.NumberFormat("id-ID", {
		currency: "IDR",
		style: "currency",
		minimumFractionDigits: 0,
	}).format(amount);

export const formatNumber = (number: number): string =>
	new Intl.NumberFormat("id-ID").format(number);

export function formatString(str: string, maxLength: number): string {
	if (str.length <= maxLength) {
		return str;
	} else {
		return str.slice(0, maxLength) + "...";
	}
}

export function formatPhoneNumber(phoneNumber: string): string {
	if (phoneNumber.startsWith("021")) {
		phoneNumber = phoneNumber.replace("021", "(021) ");
	} else if (!phoneNumber.startsWith("0")) {
		phoneNumber = "0" + phoneNumber;
	}
	return phoneNumber
		.replace(/^0/, "+62 ")
		.replace(/(\d{3})(\d{3,4})(\d{3})/, "$1-$2-$3");
}
