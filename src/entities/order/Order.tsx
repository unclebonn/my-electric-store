import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../config/store"
import { deleteAllProductInCart, getCartByUserId } from "../cart/cart.reducer"
import { CartProps } from "../cart/Cart"
import CartDetail, { ICartDetail } from "../cart/components/cartdetail"
import { Button, Col, List, Popover, Row, Skeleton } from "antd"
import { Link } from "react-router-dom"
import BillingInformation from "./components/billinginformation/billinginformation"
import { checkpayment } from "./order.reducer"
import { toast } from "react-toastify"

interface OrderProps {
    accountId: string | number
}

const Order: React.FC<OrderProps> = (props) => {
    const { accountId } = props
    const dispatch = useAppDispatch()
    const cartdetail = useAppSelector(state => state.cart.dataDetail);
    const isLoading = useAppSelector(state => state.cart.loading);
    const data = cartdetail?.data as ICartDetail[]



    useEffect(() => {
        dispatch(getCartByUserId(accountId))
    }, [])


   


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const transactionNo = Number(urlParams.get("vnp_TransactionNo"));

        if (transactionNo != 0) {
            dispatch(checkpayment({ urlResponse: window.location.href, userId: accountId }))
            dispatch(deleteAllProductInCart(accountId))
            toast.success("Cảm ơn bạn đã thanh toán thành công")
            // them api vnpay checkpayment vao day nua la xong cook
            window.history.replaceState({}, "", "https://my-electric-store-kvdd.vercel.app/thanh-toan")
        }
    }, [])


    const calculateTotalPrice = () => {
        let total = 0;

        data.map((product) => {
            total += (product.price * product.quantity)
        })

        return total
    }

    return (
        data ?
            data.length == 0
                ? <Row>
                    <Col style={{ textAlign: "center" }} span={24}>
                        <Popover placement="right" content={<Button>
                            <Link to={"/"}>
                                Đi mua đồ thôi
                            </Link>
                        </Button>}>
                            <img src="/assets/emptycart.png" alt="Cùng đi mua đồ nhé" />
                        </Popover>
                    </Col>
                </Row>
                :
                <Row gutter={[20, 0]}>
                    <Col style={{ marginTop: "30px" }} md={10}>
                        <Row style={{ height: "auto" }}>
                            <Col span={24}>
                                <List
                                    style={{ maxHeight: "600px", overflowY: "scroll" }}
                                    className="demo-loadmore-list"
                                    itemLayout="horizontal"
                                    dataSource={data} // thay vao thong tin chi tiet product trong cart
                                    renderItem={(item) => (
                                        <CartDetail accountId={accountId} detail={item} isLoading={isLoading} />
                                    )}
                                />

                            </Col>
                        </Row>
                    </Col>
                    <Col md={14}>
                        <BillingInformation detailincart={data} totalPrice={calculateTotalPrice()} />
                    </Col>
                </Row>

            : <Skeleton loading={true} paragraph={true} active />
    )
}

export default Order