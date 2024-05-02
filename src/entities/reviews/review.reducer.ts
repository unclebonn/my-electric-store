import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { EntityState } from "../../shared/utils/reducer.utils"
import axios from "axios"
import { REVIEW } from "./review.api"
import { toast } from "react-toastify"



export interface ReviewProps {
    nameUser?: string,
    imageUrl?: string,
    productId?: number | string,
    comment?: string,
    rating?: number
}

const initialState: EntityState<ReviewProps> = {
    data: null,
    dataDetail: null,
    loading: false,
    message: "",
    updateSuccess: false
}


export type ReviewState = Readonly<typeof initialState>


export const getReviewProduct = createAsyncThunk("review/getreviewbyproduct", async (productId: number | string | undefined) => {
    const requestUrl = await axios.get(`${REVIEW.CUSTOMER.GETREVIEWBYPRODUCTID}/${productId}`)
    return requestUrl

})
export const createReview = createAsyncThunk("review/create", async (review: ReviewProps, thunkApi) => {
    const requestUrl = await axios.post(`${REVIEW.CUSTOMER.CREATEVIEW}`, review)
    thunkApi.dispatch(getReviewProduct(review.productId))
    return requestUrl
})


export const ReviewSlice = createSlice({
    name: "review",
    initialState: initialState as ReviewState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addMatcher(isPending(getReviewProduct), (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            .addMatcher(isPending(createReview), (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            .addMatcher(isFulfilled(getReviewProduct), (state, action) => {
                return {
                    ...state,
                    loading: false,
                    data: action.payload.data.data
                }
            })
            .addMatcher(isFulfilled(createReview), (state, action) => {
                toast.success("Đánh giá thành công")
                return {
                    ...state,
                    loading: false
                }
            })

            .addMatcher(isRejected(createReview), (state, action) => {
                return {
                    ...state,
                    loading: false
                }
            })


            .addMatcher(isRejected(getReviewProduct), (state, action) => {
                return {
                    ...state,
                    loading: false
                }
            })
    },
})


export default ReviewSlice.reducer