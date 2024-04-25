import { createAsyncThunk, createSlice, isFulfilled, isPending } from "@reduxjs/toolkit";
import { IAccountProps } from "../../shared/reducer/authentication.reducer";
import { EntityState } from "../../shared/utils/reducer.utils";
import { UpdateProfileProps } from "./Profile";
import { PROFILE } from "../../shared/models/profile";
import axios from "axios";
import Cookies from "universal-cookie";

export const initialState: EntityState<IAccountProps> = {
    data: null,
    dataDetail: null,
    loading: false,
    message: "",
    updateSuccess: false
}


export type ProfileState = Readonly<typeof initialState>

const cookie = new Cookies()

export const getProfile = createAsyncThunk("profile/getprofile", async (userId: string | number) => {
    const requestUrl = await axios.get(`${PROFILE.CUSTOMER.GETPROFILE}?id=${userId}`);
    return requestUrl
})

export const updateProfile = createAsyncThunk("profile/updateprofile", async (profile: UpdateProfileProps, thunkApi) => {
    const requestUrl = await axios.put(`${PROFILE.CUSTOMER.UPDATEPROFILE}`, profile);
    thunkApi.dispatch(getProfile(profile.id))

    return requestUrl
})

export const ProfileSlice = createSlice({
    name: "profile",
    initialState: initialState as ProfileState,
    reducers: {
        reset() {
            return {
                ...initialState
            }
        }
    },
    extraReducers(builder) {
        builder.
            addMatcher(isPending(updateProfile, getProfile), (state, action) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addMatcher(isFulfilled(updateProfile), (state, action) => {

                if (cookie.get("account") != null) {
                    cookie.set("account", action.payload.data.data)
                }

                return {
                    ...state,
                    loading: false,
                    message: "Cập nhật thành công"
                }
            })
            .addMatcher(isFulfilled(getProfile), (state, action) => {
                return {
                    ...state,
                    loading: false,
                    dataDetail: action.payload.data
                }
            })
    },
})

export const { reset } = ProfileSlice.actions
export default ProfileSlice.reducer