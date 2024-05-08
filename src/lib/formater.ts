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
	const cleaned = phoneNumber.replace(/\D/g, "");

	if (cleaned.length === 10) {
		return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
	} else if (cleaned.length === 11) {
		return cleaned.replace(
			/(\d{2})(\d{3})(\d{4})(\d{2})/,
			"+$1 ($2) $3-$4"
		);
	} else {
		return "Phone number is not valid.";
	}
}
