export interface IProductProps {
    id: string | number,
    name: string,
    description: string,
    imageUrl: string,
    quantity: number,
    price: number,
    categoryID: number,
    warrantyPeriod?: string

}

export interface IAttributeProps {
    id: string,
    name: string,
    value: string
}

export interface IImagesProps {
    id: number | string,
    url: string
}

export interface IProductDetailProps {
    data: {
        details: IAttributeProps[],
        images: IImagesProps[],
        products: IProductProps,
        review: []

    },
    message: string
}

export interface IAllProductProps {
    data: {
        products: IProductProps[]
        totalPages: number,
        currentPage: number,
        pageSize: number,
        totalItems: number
    },
    message: string
}

export interface IProductSearch {
    categoryId?: number | null,
    page?: number | null,
    size?: number | null,
    name?: string | null,
    watt?: number | null,
    volt?: number | null,
    producer?: string | null
}