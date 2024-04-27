import { createAsyncThunk, createSlice, isFulfilled, isPending } from "@reduxjs/toolkit";
import { EntityState } from "../../shared/utils/reducer.utils";
import { IOrderProps } from "../../shared/models/order";
import Order from "./Order";
import { ORDER } from "./order.api";
import axios from "axios";
import { url } from "../../shared/utils/constant";
import Cookies from "universal-cookie";



interface FormPaymentVnPayProps {
    userId: string | number,
    device: number,
    orderId: number | string
}

interface CheckPaymentProps {
    urlResponse: string,
    userId: number | string
}

export const initialState: EntityState<IOrderProps> = {
    data: null,
    dataDetail: null,
    loading: false,
    message: "",
    updateSuccess: false
}

const cookie = new Cookies()
const account = cookie.get("account")
const id = account.id



export type OrderState = Readonly<typeof initialState>


export const createsubmitpayment = createAsyncThunk("order/submitpayment", async (form: IOrderProps) => {
    const requestUrl = await axios.post(`${ORDER.CUSTOMER.SUBMITPAYMENT}`, form);
    return requestUrl
})


export const getHistoryOrder = createAsyncThunk("order/getorderbyid", async (userId: string | number) => {
    const requestUrl = await axios.get(`${ORDER.CUSTOMER.GETORDERBYUSERID}/${userId}`);
    return requestUrl
})


export const getOrderDetail = createAsyncThunk("order/orderdetail", async (orderId: string | number) => {
    const requestUrl = await axios.get(`${ORDER.CUSTOMER.GETORDERDETAILBYUSERID}/${orderId}`);
    return requestUrl
})

//payment

export const getPaymentVnpay = createAsyncThunk("order/submitpayment", async (form: FormPaymentVnPayProps) => {
    const requestUrl = await axios.get(`${url}/Payment/vn-pay/${form.userId}/${form.orderId}/${form.device}`)
    return requestUrl
})


export const checkpayment = createAsyncThunk("order/checkpayment", async (paymentinfo: CheckPaymentProps) => {
    const requestUrl = await axios.post(`${url}/Payment/vn-pay/check-payment`, paymentinfo);
    return requestUrl
})
export const updateStatusOrdeCancel = createAsyncThunk("order/updatestatusorder", async ({ accountid, orderid }: { accountid: number, orderid: number }, thunkapi) => {
    const requestUrl = await axios.put(`${url}/Order/updateStatus/${orderid}/3`)
    thunkapi.dispatch(getHistoryOrder(accountid))
    return requestUrl
})





export const OrderSLice = createSlice({
    name: "order",
    initialState: initialState as OrderState,
    reducers: {

    },
    extraReducers(builder) {
        builder.
            addMatcher(isPending(createsubmitpayment), (state, action) => {
                return {
                    ...state,
                    loading: true,
                    message: "Vui lòng đợi xác thực của nhân viên"

                }
            })

            .addMatcher(isFulfilled(createsubmitpayment), (state, action) => {
                return {
                    ...state,
                    loading: false,
                    message: "Mua hàng thành công. Xin cảm ơn"
                }
            })


            .addMatcher(isPending(getPaymentVnpay, checkpayment, getHistoryOrder, getOrderDetail, updateStatusOrdeCancel), (state, action) => {
                return {
                    ...state,
                    loading: true,
                    message: "Vui lòng đợi một tí!"

                }
            })

            .addMatcher(isFulfilled(getHistoryOrder), (state, action) => {
                return {
                    ...state,
                    loading: false,
                    data: action.payload.data
                }
            })
            .addMatcher(isFulfilled(getOrderDetail), (state, action) => {
                return {
                    ...state,
                    loading: false,
                    dataDetail: action.payload.data
                }
            })
            .addMatcher(isFulfilled(getPaymentVnpay), (state, action) => {
                return {
                    ...state,
                    loading: false,
                    message: "Tới trang thanh toán"
                }
            })
            .addMatcher(isFulfilled(checkpayment), (state, action) => {
                return {
                    ...state,
                    loading: false,
                    message: "Thanh toán thành công xin cảm ơn"
                }
            })
            .addMatcher(isFulfilled(updateStatusOrdeCancel), (state, action) => {
                return {
                    ...state,
                    loading: false,
                    message: "Cập nhật thành công"
                }
            })
    },
})


export default OrderSLice.reducer