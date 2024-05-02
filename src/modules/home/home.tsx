import { Card, Col, Divider, FloatButton, Pagination, Popover, Row, Skeleton } from "antd"
import Meta from "antd/es/card/Meta";
import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { getAllproduct, reset } from "../../entities/product/product.reducer";
import { IAllProductProps } from "../../shared/models/product";
import { formatCurrencyVN } from "../../shared/utils/formatCurrency";
import Cookies from "universal-cookie";
import { createProductToCart } from "../../entities/cart/cart.reducer";
import { toast } from "react-toastify";
import { getAllCategory, getProductByCategoryId } from "../../entities/category/category.reducer";


const Home = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.product.data) as IAllProductProps;
    const allCategory = useAppSelector(state => state.category.data);

    const isLoading = useAppSelector(state => state.product.loading);
    const cookie = new Cookies()
    const account = cookie.get("account")


    const BannerStyle: React.CSSProperties = {
        margin: "20px 0px"
    }

    const descriptionStyle: React.CSSProperties = {
        overflow: "hidden",
        display: "-webkit-box",
        textOverflow: "ellipsis",
        height: "50px",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
    }



    const toDetailProductPage = (id: string | number) => {
        dispatch(reset())
        navigate(`chi-tiet-san-pham/${id}`)
    }

    const onChangePagination = (page: number, pageSize: number = 15) => {
        dispatch(getAllproduct({ page: page, size: pageSize }))
    }

    useEffect(() => {
        dispatch(getAllproduct({ page: 1, size: 10 }))
        dispatch(getAllCategory())
    }, [])



    const addProductToCart = (productid: number | string) => {
        if (account == null) {
            navigate("/login")
            toast("Vui lòng đăng nhập để mua hàng")
        } else {
            const data = {
                productId: productid,
                quantity: 1,
                userId: account.id
            }
            dispatch(createProductToCart(data))
        }


    }
    return (
        <>
            <Row style={{ marginTop: 30 }}>
                <Col onClick={() => dispatch(getAllproduct({ page: 1, size: 10 }))} span={6} style={{ margin: "5px 0px", textAlign: "center", backgroundColor: "rgb(240 232 28)", borderRight: "1px solid black", cursor: "pointer", padding: "10px 20px" }}>
                    <div>Tất cả danh mục</div>
                </Col>
                {allCategory != null ? allCategory.data.map((category: any) => {
                    return (
                        <Col onClick={() => dispatch(getProductByCategoryId({ categoryId: category.categoryID, page: 1, size: 10 }))} span={6} style={{ margin: "5px 0px", textAlign: "center", backgroundColor: "#eae79b", borderRight: "1px solid black", cursor: "pointer", padding: "10px 20px" }}>
                            <div>{category.categoryName}</div>
                        </Col>

                    )
                })
                    :
                    <Skeleton />
                }
            </Row>
            <Row style={BannerStyle} className="banner">
                <Col span={24}>
                    <img width={"100%"} src="https://mekoong.com/wp-content/uploads/2022/07/DO-DIEN-GIA-DUNG-1.jpg" alt="banner_image" />
                </Col>
            </Row>

            <Row gutter={[50, 50]} className="products">
                {isLoading ? <Skeleton /> :
                    products?.data?.products?.map((product) => {
                        return (
                            <Col key={product.id} md={6} >
                                <Row>
                                    <Card
                                        onClick={() => toDetailProductPage(product.id!)}
                                        hoverable
                                        style={{ width: "100%" }}
                                        cover={<img style={{ objectFit: "contain" }} height={"200px"} alt="example" src={product.imageUrl} />}
                                    >
                                        <Meta title={product.name}
                                            description={
                                                <>
                                                    <div style={descriptionStyle}>
                                                        {product.description}
                                                    </div>
                                                    <div style={{ textAlign: "center" }}>
                                                        <h3 style={{ color: "red" }}>{formatCurrencyVN(product.price)}</h3>
                                                    </div>

                                                </>
                                            } />
                                    </Card>
                                </Row>
                                <Row>
                                    <div onClick={() => addProductToCart(product.id)} style={{ width: "100%", cursor: "pointer", padding: 8, background: "orange", textAlign: "center" }}>
                                        <p>Thêm vào giỏ hàng</p>
                                    </div>
                                </Row>
                            </Col>
                        )
                    })
                }
            </Row>

            <Row style={{ marginTop: "30px" }}>
                <Col style={{ textAlign: "center" }} span={24}>
                    <Pagination defaultCurrent={1} total={products?.data?.totalItems} onChange={onChangePagination} />
                </Col>
            </Row>
        </>
    )
}

export default Home