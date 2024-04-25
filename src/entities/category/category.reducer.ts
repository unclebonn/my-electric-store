import { createAsyncThunk, createSlice, isFulfilled, isPending } from "@reduxjs/toolkit";
import { EntityState } from "../../shared/utils/reducer.utils";
import { CATEGORY } from "./category.api";
import axios from "axios";

const initialState: EntityState<any> = {
    data: null,
    dataDetail: null,
    loading: false,
    message: "",
    updateSuccess: false
}

interface CategoryProps {
    categoryId: string | number,
    page: number,
    size: number
}

type CategoryState = Readonly<typeof initialState>

export const getAllCategory = createAsyncThunk("category/getall", async () => {
    const requestUrl = await axios.get(`${CATEGORY.CUSTOMER.GETALLCATEGORY}`)
    return requestUrl
})
export const getProductByCategoryId = createAsyncThunk("category/getproductbycategory", async (category: CategoryProps) => {
    const requestUrl = await axios.get(`${CATEGORY.CUSTOMER.GETPRODUCTBYCATEGORY}/${category.categoryId}?size=${category.size}&page=${category.page}`)
    return requestUrl
})



export const CategorySlice = createSlice({
    name: "category",
    initialState: initialState as CategoryState,
    reducers: {

    },
    extraReducers(builder) {
        builder.
            addMatcher(isPending(getAllCategory, getProductByCategoryId), (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            .addMatcher(isFulfilled(getAllCategory), (state, action) => {
                return {
                    ...state,
                    loading: false,
                    data: action.payload.data
                }
            })

    },
})


export default CategorySlice.reducer