import { createAsyncThunk, createSlice, isFulfilled, isPending } from "@reduxjs/toolkit";
import { EntityState } from "../../shared/utils/reducer.utils";
import axios from "axios";
import { BLOG } from "./blog.api";
import { BlogProps } from "../../shared/models/blog";

const initialState: EntityState<BlogProps> = {
    data: null,
    dataDetail: null,
    loading: false,
    message: "",
    updateSuccess: false
}

export type BlogState = Readonly<typeof initialState>

export const getAllBlog = createAsyncThunk("blog/getallblog", async () => {
    const requestUrl = await axios.get(`${BLOG.CUSTOMER.GETALLBLOG}`)
    return requestUrl
})


export const getBlogDetail = createAsyncThunk("blog/getblogdetail", async (blogid: string | number) => {
    const requestUrl = await axios.get(`${BLOG.CUSTOMER.GETBLOGDETAIL}/${blogid}`)
    return requestUrl
})


export const BlogSlice = createSlice({
    name: "blog",
    initialState: initialState as BlogState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addMatcher(isPending(getAllBlog, getBlogDetail), (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            .addMatcher(isFulfilled(getAllBlog), (state, action) => {
                return {
                    ...state,
                    loading: false,
                    data: action.payload.data
                }
            })
            .addMatcher(isFulfilled(getBlogDetail), (state, action) => {
                return {
                    ...state,
                    loading: false,
                    dataDetail: action.payload.data
                }
            })
    },
})


export default BlogSlice.reducer

