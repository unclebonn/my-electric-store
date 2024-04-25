export interface IAddingCartProps {
    productId: number | string,
    quantity: number,
    userId: number | string
}


export interface IDeleteProductProps {
    productId: number | string,
    userId: number | string
}

export interface IUpdateQuantityProps {
    productId: number | string,
    userId: number | string,
    quantity: number
}