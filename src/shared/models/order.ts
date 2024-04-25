export interface IOrderProps {
    orderDetails?: [
        {
            productId: number,
            quantity: number,
            price: number,
        }
    ],
    status?: number,
    statusMessage?: string,
    paymentName?: string,
    nameCustomer?: string,
    addressCustomer?: string,
    phoneCustomer?: string,
    userId?: number | string

}


export interface ExtraInformation {
    phoneCustomer: string,
    nameCustomer: string,
    addressCustomer: string,

}