import { DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Avatar, Input, List, Row, Skeleton } from "antd"
import React, { useEffect, useState } from "react"
import { formatCurrencyVN } from "../../../shared/utils/formatCurrency"
import { useAppDispatch } from "../../../config/store"
import { deleteProductInCart, updateQuantityProduct } from "../cart.reducer"


export interface ICartDetail {
    productId: number,
    productName: string,
    imageUrl: string,
    quantity: number,
    price: number
}


export interface CartDetailProps {
    detail: ICartDetail,
    accountId: string | number,
    isLoading: boolean
}



const CartDetail: React.FC<CartDetailProps> = (props) => {
    const { imageUrl, price, productId, productName, quantity } = props.detail
    const { accountId, isLoading } = props

    const [quantityProduct, setQuantityProduct] = useState<number>(quantity)

    const dispatch = useAppDispatch()

    const descriptionStyle: React.CSSProperties = {
        overflow: "hidden",
        display: "-webkit-box",
        textOverflow: "ellipsis",
        height: "50px",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
    }

    const onClickPlusQuantity = (quantity: number) => {
        dispatch(updateQuantityProduct({ userId: accountId, productId, quantity: quantity + 1 }))
        // setQuantityProduct((quantityProduct) => {
        //     return quantityProduct + 1
        // }
        // )

    }

    useEffect(() => {
        setQuantityProduct(quantity)
    }, [quantity])


    const onClickMinusQuantity = (quantity: number) => {
        if (quantityProduct === 1) {
            dispatch(deleteProductInCart({ productId, userId: accountId }))

        } else {
            setQuantityProduct((quantityProduct) => {
                dispatch(updateQuantityProduct({ userId: accountId, productId, quantity: quantityProduct - 1 }))
                return quantityProduct - 1
            })
        }
    }

    const onClickDeleteProduct = (productId: string | number) => {
        dispatch(deleteProductInCart({ productId, userId: accountId }))
    }
    return (
        <>
            <List.Item
                key={productId}
                actions={[

                    <Row>
                        <MinusCircleOutlined style={{ cursor: "pointer" }} onClick={() => onClickMinusQuantity(quantity)} />
                        <Input unselectable="on" type="text" min={1} value={quantity} style={{ width: "40px", margin: "0px 3px" }} />
                        <PlusCircleOutlined  style={{ cursor: "pointer" }} onClick={() => onClickPlusQuantity(quantity)} />
                    </Row>,
                    <span style={{ color: "red" }} ><DeleteOutlined onClick={() => onClickDeleteProduct(productId)} /></span>]}
            >

                <List.Item.Meta
                    avatar={<Avatar style={{ objectFit: "contain" }} size={"large"} shape="square" src={imageUrl} />}
                    title={<div style={descriptionStyle}>
                        {productName}
                    </div>}
                    description={
                        <div>
                            <div style={descriptionStyle}>
                                {formatCurrencyVN(price)}
                            </div>
                            <div style={{ color: "black", display: "flex", justifyContent: "space-between" }}>
                                <div>Thành tiền </div>
                                <div>{formatCurrencyVN(quantity * price)}</div>
                            </div>
                        </div>
                    }
                >

                </List.Item.Meta>

            </List.Item>
        </>

    )
}

export default CartDetail