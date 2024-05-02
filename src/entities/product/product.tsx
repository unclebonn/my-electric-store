import { Card, Checkbox, Col, Input, Pagination, RadioProps, Row, Skeleton, Slider } from "antd"
import React, { ChangeEvent, EventHandler, MouseEvent, MouseEventHandler, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../config/store"
import { IAllProductProps, IProductProps } from "../../shared/models"
import Meta from "antd/es/card/Meta"
import { getAllproduct, getProductsBySearch, reset } from "./product.reducer"
import { formatCurrencyVN } from "../../shared/utils/formatCurrency"
import { toast } from "react-toastify"
import { createProductToCart } from "../cart/cart.reducer"
import Cookies from "universal-cookie"
export const Product: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.product.dataSearch) as IAllProductProps;
    const isLoading = useAppSelector(state => state.product.loadingSearch);


    const [visible, setVisible] = useState<boolean>(false)
    const [visibleWatt, setVisibleWatt] = useState<boolean>(false)

    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(1);


    const [watt, setWatt] = useState<number | null>(null)
    const [volt, setVolt] = useState<number | null>(null)
    const [producer, setProducer] = useState<string | null>(null)

    const urlParams = new URLSearchParams(window.location.search);
    const nameSearch = urlParams.get("name");


    const cookie = new Cookies()
    const account = cookie.get("account")


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
        navigate(`/chi-tiet-san-pham/${id}`)
    }

    const onChangePagination = (page: number, pageSize: number = 15) => {
        setPage(page)
        setSize(pageSize)
    }


    useEffect(() => {
        dispatch(getProductsBySearch({ page: page, size: 10, watt: watt, name: nameSearch, producer: producer, volt: volt }))
    }, [dispatch, watt, volt, producer, page, size, nameSearch])





    const unselectedAttribute = () => {
        const volt = document.getElementsByName("volt");
        const watt = document.getElementsByName("watt");

        volt.forEach((volt: any) => {
            volt.checked = false
        })

        watt.forEach((volt: any) => {
            volt.checked = false
        })

        setVisible(false)
        setVisibleWatt(false)
        dispatch(getProductsBySearch({ page: page, size: 10, name: nameSearch, producer: producer }))

    }

    const resetBtnVisible = (e: any) => {
        const value = e.target.value
        setVolt(value)
        setVisible(true)
    }
    const resetBtnVisibleWatt = (e: any) => {
        const value = e.target.value
        setWatt(value)
        setVisibleWatt(true)
    }

    const onChangeProducer = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setProducer(value)
    }


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
        <Row style={{ marginTop: "50px" }} gutter={[50, 50]}>
            <Col md={5}>
                <div style={{ boxSizing: "border-box", border: "1px solid rgba(0,0,0,0.1)", padding: "15px" }} >
                    <Row style={{ margin: "10px 0px" }}>
                        <Col span={24}>
                            <div style={{ margin: "10px 0px" }}>
                                <h4>Các bộ lọc phổ biến</h4>
                            </div>

                            <Row gutter={[0, 20]}>
                                <Col span={24}>
                                    <h5>Volt</h5>
                                </Col>
                                <Col span={24}>
                                    <input onClick={resetBtnVisible} type="radio" name="volt" value={220} />
                                    <label htmlFor="">220V</label>
                                </Col>
                                <Col span={24}>
                                    <input onClick={resetBtnVisible} type="radio" name="volt" value={110} />
                                    <label htmlFor="">110V</label>
                                </Col>
                                <Col span={24}>
                                    <h5>Watt</h5>
                                </Col>
                                <Col span={24}>
                                    <input onClick={resetBtnVisibleWatt} type="radio" name="watt" value={50} />
                                    <label htmlFor="">50W</label>
                                </Col>
                                <Col span={24}>
                                    <input onClick={resetBtnVisibleWatt} type="radio" name="watt" value={100} />
                                    <label htmlFor="">100W</label>
                                </Col>
                                <Col span={24}>
                                    <Row>
                                        <h5>Nhà sản xuất</h5>
                                        <Input type="text" onChangeCapture={onChangeProducer} />
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    {visible || visibleWatt ? <button onClick={() => unselectedAttribute()}>Bỏ chọn</button> : <></>}
                                </Col>

                            </Row>

                        </Col>
                    </Row>
                </div>
            </Col>
            <Col md={19}>
                <Row gutter={[50, 50]} className="products">
                    {isLoading ? <Skeleton /> :

                        products != null ?
                            products.data?.products?.map((product) => {
                                return (
                                    <>

                                        <Col key={product.id} md={8} >
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
                                    </>
                                )
                            })
                            : <></>
                    }
                </Row>

                <Row style={{ marginTop: "30px" }}>
                    <Col style={{ textAlign: "center" }} span={24}>
                        <Pagination defaultCurrent={1} total={products?.data?.totalItems} onChange={onChangePagination} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}