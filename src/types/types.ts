export type LaundryService = {
    id: string
    name: string
    price: number
    unit?: string | null
}

export type PaymentMethod = {
    id: string
    name: string
    provider: string
}
