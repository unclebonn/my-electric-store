import { Avatar, Button, Col, Image, Input, List, Row, Skeleton } from "antd"
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../config/store"
import { deleteProductInCart, getCartByUserId } from "./cart.reducer"
import Cookies from "universal-cookie"
import { IAccountProps } from "../../shared/reducer/authentication.reducer"
import { DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { formatCurrencyVN } from "../../shared/utils/formatCurrency"
import CartDetail, { CartDetailProps, ICartDetail } from "./components/cartdetail"



export interface CartProps {
    dataCart: {
        data: ICartDetail[],
        message: ""
    },
    isLoading: boolean,
    accountId: string | number
}

export const Cart: React.FC<CartProps> = (props) => {
    const { dataCart, isLoading, accountId } = props

    const calculateTotalPrice = () => {
        let total = 0;

        dataCart.data?.map((product) => {
            total += (product.price * product.quantity)
        })

        return total
    }

    return (
        dataCart?.data ?
            <div>
                <List
                    style={{ width: "400px", maxHeight: "360px", overflowY: "scroll" }}
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={dataCart.data} // thay vao thong tin chi tiet product trong cart
                    renderItem={(item) => (
                        <CartDetail accountId={accountId} detail={item} isLoading={isLoading} />
                    )}
                />

                <div style={{ textAlign: "right" }}>
                    <h3 style={{ marginRight: "30px" }}>Tổng tiền {formatCurrencyVN(Number(calculateTotalPrice()))}</h3>
                </div>

                <Row style={{ margin: "30px" }}>
                    <Col span={24} style={{ display: "flex", justifyContent: "center", }}>
                        <Button size="large" style={{ width: "100%" }}>
                            <Link style={{ display: "inline-block", width: "100%" }} to={"/thanh-toan"}>
                                Thanh toán
                            </Link>
                        </Button>
                    </Col>
                </Row>
            </div>

            : <List style={{ width: "400px" }}></List>
    )
}


export const CartWithoutLogin: React.FC = () => {
    return (
        <Row style={{ padding: "100px", width: "450px", display: "grid", justifyContent: "center", margin: "auto" }}>
            <Col span={24} style={{ textAlign: "center" }}>
                <img
                    width={"100px"}
                    src="/assets/signaling.png"
                />
            </Col>
            <Col span={24}>
                <Button>
                    <Link to={"/login"}>
                        Đăng nhập nhé
                    </Link>
                </Button>
            </Col>
        </Row>
    )
}