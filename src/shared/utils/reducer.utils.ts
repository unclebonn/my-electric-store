export interface EntityState<T> {
    loading: boolean,
    data: T | any,
    message: string,
    dataDetail: T | any,
    updateSuccess?: boolean
}


export interface IQueryParams {
    size: number,
    page: number
}