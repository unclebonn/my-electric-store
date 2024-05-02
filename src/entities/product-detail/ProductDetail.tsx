import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import EditorContent from "../../shared/ckeditor/components/Editor";
import axios from "axios";
import { Avatar, Button, Carousel, Col, Divider, Form, Image, Input, List, Rate, Row, Skeleton, Table, TableProps, Typography } from "antd";
import { formatCurrencyVN } from "../../shared/utils/formatCurrency";
import "./productdetail.scss"
import { CarTwoTone, GoldTwoTone, HeartTwoTone, PhoneTwoTone } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { getProductDetail } from "../product/product.reducer";
import { IProductDetailProps, IProductProps } from "../../shared/models";
import { IAddingCartProps } from "../../shared/models/cart";
import Cookies from "universal-cookie";
import { IAccountProps } from "../../shared/reducer/authentication.reducer";
import { createProductToCart } from "../cart/cart.reducer";
import { toast } from "react-toastify";
import { ReviewProps, createReview, getReviewProduct } from "../reviews/review.reducer";

interface DataType {
    key: string;
    name: string;
    value: string
}

const ProductDetail: React.FC = () => {


    const params = useParams()
    const id = params.id!
    const dispatch = useAppDispatch();
    const productdetail = useAppSelector(state => state.product.dataDetail) as IProductDetailProps
    const isLoading = useAppSelector(state => state.product.loading)
    const [quantity, setQuantity] = useState<number>(1);
    const cookie = new Cookies();
    const account = cookie.get("account") as IAccountProps;

    const review = useAppSelector(state => state.review.data) as ReviewProps[]

    const navigate = useNavigate()

    const [start, setStart] = useState(5);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getProductDetail(id))
        dispatch(getReviewProduct(id))
    }, [])


    const plusQuantity = () => {
        if (productdetail?.data.products.quantity <= quantity) {

        } else {
            setQuantity((quantity) => quantity + 1)
        }
    }
    const minusQuantity = () => {
        if (quantity === 1) {

        } else {
            setQuantity(quantity => quantity - 1)
        }
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Nội dung',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Thông tin',
            dataIndex: 'value',
            key: 'value',

        },
    ]


    const data: DataType[] = productdetail?.data?.details?.map((detail) => {
        return {
            key: detail.id,
            name: detail.name,
            value: detail.value
        }
    })

    const onClickBuy = () => {
        if (account == null) {
            navigate("/login")
            toast("Vui lòng đăng nhập để mua hàng")
        } else {
            const product_add_to_cart = {
                productId: productdetail.data.products.id,
                quantity: quantity,
                userId: account.id
            }
            dispatch(createProductToCart(product_add_to_cart))
        }

    }

    const onReview = (formSubmit: ReviewProps) => {

        const formReview =
        {
            "userId": account.id,
            "productId": id,
            "comment": formSubmit.comment,
            "rating": start
        }
        form.resetFields();
        dispatch(createReview(formReview))


    }


    const onChangeStart = (numbofstart: number) => {
        setStart(numbofstart)
    }





    return (
        <Row style={{ marginTop: "30px" }} gutter={[30, 10]}>
            {isLoading ? <Skeleton /> :

                <>
                    {/* Image part */}
                    <Col md={11}>
                        <Row style={{ width: "100%" }}>
                            <Col span={24}>
                                <Carousel style={{ width: "100%" }} autoplay>
                                    {productdetail?.data?.images?.map((image) => {
                                        return (
                                            <Image
                                                alt="ảnh sản phẩm"
                                                style={{ objectFit: "contain" }}
                                                height={"500px"}
                                                width={"100%"}
                                                src={image.url ?? "/assets/imagebroke.png"}
                                            />
                                        )
                                    })}
                                </Carousel>
                            </Col>
                        </Row>
                    </Col>
                    {/* Add to cart part */}
                    <Col md={13}>
                        <Row>
                            <Col md={24} style={{ marginBottom: "10px" }}>
                                <h1>{productdetail?.data?.products.name}</h1>
                            </Col>

                            <Col md={12}>
                                <p>Mã sản phẩm: <span style={{ color: "red" }}><strong>{productdetail?.data?.products.id}</strong> </span></p>
                            </Col>
                            <Col md={12}>
                                <p>Số lượng còn lại: <span style={{ color: "red" }}><strong>{productdetail?.data.products.quantity > 0 ? productdetail?.data.products.quantity : 0} </strong></span></p>
                            </Col>
                            <Col md={24} style={{ marginTop: "10px" }}>
                                <p>Giá tiền: <span style={{ color: "red" }}><strong>{formatCurrencyVN(Number(productdetail?.data?.products.price))}</strong></span></p>
                            </Col>
                            <Col md={24} style={{ marginTop: "10px" }}>
                                <Row>
                                    <span style={{ display: "inline-block", textAlign: "center", paddingTop: "4px", marginRight: "10px" }}>Chọn số lượng: </span>
                                    <Row style={{ border: "1px solid grey", borderRadius: "30px" }}>
                                        <button className="btnQuantityPlus" onClick={() => minusQuantity()}>-</button>
                                        <span style={{ display: "inline-block", width: "50px", textAlign: "center", margin: "auto 0" }}>{quantity}</span>
                                        <button disabled={productdetail?.data.products.quantity <= quantity} className="btnQuantityMinus" onClick={() => plusQuantity()}>+</button>
                                    </Row>

                                </Row>
                            </Col>
                            <Col md={24} style={{ marginTop: "40px" }}>
                                <Row gutter={[20, 0]} style={{ textAlign: "center" }}>
                                    {productdetail?.data.products.quantity > 0 ?
                                        <>
                                            <Col md={12}>
                                                <Button className="addingtocart" onClick={() => onClickBuy()} style={{ height: "70px", backgroundColor: "orange", color: "white" }} shape="round" size="large">
                                                    <h4>THÊM VÀO GIỎ HÀNG</h4>
                                                    <p style={{ fontSize: "13px" }}>Giao hàng thu tiền tận nơi</p>
                                                </Button>
                                            </Col>
                                            <Col md={12}>
                                                <Button className="buydirectly" style={{ height: "70px", backgroundColor: "red", color: "white" }} shape="round" size="large">
                                                    <h4>MUA ONLINE NGAY</h4>
                                                    <p style={{ fontSize: "13px" }}>Thủ tục online đơn giản</p>
                                                </Button>
                                            </Col>
                                        </>
                                        :
                                        <>
                                            <Col md={12}>
                                                <Button disabled className="addingtocart" style={{ height: "70px", backgroundColor: "grey", color: "white" }} shape="round" size="large">
                                                    <h4>THÊM VÀO GIỎ HÀNG</h4>
                                                    <p style={{ fontSize: "13px" }}>Giao hàng thu tiền tận nơi</p>
                                                </Button>
                                            </Col>
                                            <Col md={12}>
                                                <Button disabled className="buydirectly" style={{ height: "70px", backgroundColor: "grey", color: "white" }} shape="round" size="large">
                                                    <h4>MUA ONLINE NGAY</h4>
                                                    <p style={{ fontSize: "13px" }}>Thủ tục online đơn giản</p>
                                                </Button>
                                            </Col>
                                        </>
                                    }

                                </Row>
                            </Col>
                            <Col md={24} style={{ marginTop: "40px" }}>
                                <Row gutter={[20, 0]} style={{ borderRadius: "8px", boxSizing: "border-box", padding: "20px", border: "1px dashed grey", textAlign: "center" }}>
                                    <Col md={8}>
                                        <div style={{ marginBottom: "16px" }}>
                                            <GoldTwoTone style={{ fontSize: "30px", color: "orangered" }} />
                                        </div>
                                        <div>
                                            <h4>Kiểm tra hàng</h4>
                                        </div>
                                        <div>
                                            <p>trước khi thanh toán</p>
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div style={{ marginBottom: "16px" }}>
                                            <HeartTwoTone style={{ fontSize: "30px" }} />
                                        </div>
                                        <div>
                                            <h4>100%</h4>
                                        </div>
                                        <div>
                                            <p>Hàng chính hãng</p>
                                        </div>

                                    </Col>
                                    <Col md={9}>
                                        <div style={{ marginBottom: "16px" }}>
                                            <CarTwoTone style={{ fontSize: "30px" }} />
                                        </div>
                                        <div>
                                            <h4>Miễn phí vận chuyển</h4>
                                        </div>
                                        <div>
                                            <p>theo chính sách giao hàng</p>
                                        </div>

                                    </Col>
                                </Row>
                            </Col>
                            <Col md={24} style={{ marginTop: "20px" }}>
                                <div style={{ textAlign: "center" }}>
                                    <span ><PhoneTwoTone /></span>
                                    <span style={{ marginLeft: "10px", display: "inline-block", marginRight: "10px", cursor: "pointer", fontSize: "20px", color: "red", textTransform: "uppercase" }}>039 272 636</span>
                                    <span>Gọi tư vấn (8:00-22:00)</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>

                        </Row>
                    </Col>

                    <Divider type="horizontal" plain />

                    <Col md={24} style={{ marginTop: "20px" }}>
                        <Row>
                            <Col span={24}>
                                <Row gutter={[30, 0]}>
                                    <Col span={16} style={{ textAlign: "left" }}>
                                        <Row gutter={[20, 40]}>
                                            <Col span={24}>
                                                <h2>Mô tả sản phẩm</h2>
                                                <p>
                                                    {productdetail?.data?.products.description}
                                                </p>
                                            </Col>
                                            <Col span={24}>
                                                <h2>Đánh giá</h2>
                                                <Form form={form} onFinish={onReview} style={{ border: "1px solid rgba(0,0,0,0.9)", padding: 10, borderRadius: 10 }}>
                                                    <div
                                                        style={{ margin: 10, textAlign: "right" }}
                                                    >
                                                        <Rate onChange={onChangeStart} disabled={account != null ? false : true} defaultValue={5} />
                                                    </div>
                                                    <Form.Item
                                                        name="comment"
                                                        rules={[{
                                                            required: true,
                                                            message: "Vui lòng nhập trường này"
                                                        }]}
                                                    >
                                                        <Input.TextArea disabled={account != null ? false : true} placeholder="Đánh giá ở đây nhé !" name="comment" />
                                                    </Form.Item>
                                                    <div style={{ margin: 10, textAlign: "right" }}>
                                                        {account != null ? <Button htmlType="submit">Đánh giá</Button> : <p>Đăng nhập để đánh giá nhé</p>}
                                                    </div>
                                                </Form>
                                            </Col>
                                            <Col span={24}>
                                                <List
                                                    style={{ maxHeight: 400, overflowY: "scroll" }}
                                                    itemLayout="horizontal"
                                                    dataSource={review != null ? review : []}
                                                    renderItem={(item, index) => (
                                                        <List.Item>
                                                            <List.Item.Meta
                                                                avatar={<Avatar src={item.imageUrl} />}
                                                                title={
                                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                        <span style={{ fontSize: 14, fontWeight: "bold" }}>{item.nameUser}</span>
                                                                        <Rate disabled defaultValue={item.rating} />
                                                                    </div>
                                                                }
                                                                description={item.comment}
                                                            />
                                                        </List.Item>
                                                    )}
                                                />

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Table bordered={true} columns={columns} dataSource={data} pagination={false}></Table>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                    </Col>
                </>
            }
        </Row >
    )
}


export default ProductDetail