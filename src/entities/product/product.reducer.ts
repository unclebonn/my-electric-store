import { createAsyncThunk, createSlice, isFulfilled, isPending } from "@reduxjs/toolkit";
import { IAllProductProps, IProductProps, IProductSearch } from "../../shared/models/product";
import { EntityState, IQueryParams } from "../../shared/utils/reducer.utils";
import { PRODUCT } from "./product.api";
import axios from "axios";
import { getProductByCategoryId } from "../category/category.reducer";


export const initialState: EntityState<any> = {
    dataDetail: null,
    data: [],
    message: "",
    loading: false,
}


export type ProductState = Readonly<typeof initialState>

export const getAllproduct = createAsyncThunk("product/getAll", async ({ size, page }: IQueryParams) => {
    const requestUrl = `${PRODUCT.CUSTOMER.GETPRODUCTALL}?size=${size}&page=${page}`;
    return await axios.get<IAllProductProps>(requestUrl);
})


export const getProductDetail = createAsyncThunk("product/getDetail", async (id: string | number) => {
    const requestURL = `${PRODUCT.CUSTOMER.GETPRODUCTDETAIL}/${id}`
    return await axios.get<IProductProps>(requestURL)
})


export const getProductsBySearch = createAsyncThunk("product/getdetailbysearch", async ({ name, page, producer, size, volt, watt, categoryId }: IProductSearch) => {
    const requestUrl = await axios.get(`${PRODUCT.CUSTOMER.GETPRODUCTBYSEARCH}?page=${page}&size=${size}${name != null && name != "" ? `&name=${name}` : ``}${categoryId != null ? `&categoryId=${categoryId}` : ``}${watt != null ? `&watt=${watt}` : ``}${volt != null ? `&volt=${volt}` : ``}${producer != null ? `&producer=${producer}` : ``}`);
    return requestUrl
})

export const getProductByName = createAsyncThunk("product/getDetailbynaem", async (name: string) => {
    const requestURL = `${PRODUCT.CUSTOMER.GETPRODUCTBYNAME}/${name}?page=1&size=6`
    return await axios.get<IAllProductProps>(requestURL)
})


export const ProductSlice = createSlice({
    name: "product",
    initialState: initialState as ProductState,
    reducers: {
        reset() {
            return {
                ...initialState
            }
        }

    },
    extraReducers(builder) {
        builder
            .addMatcher(isPending(getAllproduct, getProductDetail), (state) => {
                state.loading = true

            })
            .addMatcher(isPending(getProductsBySearch), (state) => {
                return {
                    ...state,
                    loadingSearch: true
                }

            })
            .addMatcher(isPending(getProductByName), (state) => {
                return {
                    ...state,
                    loadingSearchName: true
                }

            })
            .addMatcher(isFulfilled(getAllproduct, getProductByCategoryId), (state, action) => {
                const { data } = action.payload
                return {
                    ...state,
                    data: data,
                    loading: false,

                }
            })
            .addMatcher(isFulfilled(getProductDetail), (state, action) => {
                const { data } = action.payload
                return {
                    ...state,
                    dataDetail: data,
                    loading: false
                }
            })
            .addMatcher(isFulfilled(getProductsBySearch), (state, action) => {
                const { data } = action.payload
                return {
                    ...state,
                    dataSearch: data,
                    loadingSearch: false
                }
            })
            .addMatcher(isFulfilled(getProductByName), (state, action) => {
                const { data } = action.payload
                return {
                    ...state,
                    dataSearchName: data,
                    loadingSearchName: false
                }
            })
    }
})


export const { reset } = ProductSlice.actions

export default ProductSlice.reducer