export const formatCurrency = (amount: number): string => new Intl.NumberFormat('id-ID', { currency: "IDR", style: 'currency', minimumFractionDigits: 0 }).format(amount)

export  const formatNumber = (number: number): string => new Intl.NumberFormat('id-ID').format(number)

export function formatString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
        return str;
    } else {
        return str.slice(0, maxLength) + '...';
    }
}