export interface OrderModel {
    id: number
    movieId: number
    title: string
    genre: string
    count: number
    pricePerItem: string
    startDate: string
    status: 'ordered' | 'paid' | 'canceled'
    rating: null | boolean
}