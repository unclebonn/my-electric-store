import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import { AutoComplete, Button, Col, Dropdown, Input, MenuProps, Row } from "antd"
import Search from "antd/es/input/Search"
import React, { EventHandler, KeyboardEvent, MouseEvent, useEffect, useState } from "react"
import "./header.scss"
import { Link, NavLink, useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import { useAppDispatch, useAppSelector } from "../../../config/store"
import { logout } from "../../reducer/authentication.reducer"
import { useDispatch } from "react-redux"
import { getProductByName, getProductsBySearch } from "../../../entities/product/product.reducer"
import { IProductDetailProps, IProductProps } from "../../models"
import { formatCurrencyVN } from "../../utils/formatCurrency"

const Header: React.FC = () => {



    const cookie = new Cookies();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const dataSearchName = useAppSelector(state => state.product.dataSearchName);
    const data = dataSearchName?.data.products as IProductProps[]

    const [nameSearch, setNameSearch] = useState<string>("")

    const Header: React.CSSProperties = {
        width: "100%",
        backgroundColor: "white",
        // position: "fixed",
    }

    const HeaderContainer: React.CSSProperties = {
        width: "1100px",
        margin: "0 auto"
    }


    const SubHeader: React.CSSProperties = {
        backgroundColor: "orange"
    }
    const SubHeaderContainer: React.CSSProperties = {
        width: "1100px",
        margin: "0 auto",

    }


    const styleNavLink: React.CSSProperties = {
        color: "white",
        width: "100%",
        height: "100%"
    }

    const items: MenuProps['items'] = [
        {
            label: <span>Hồ sơ</span>,
            icon: "",
            key: '0',
            onClick: () => {
                navigate("/ho-so")
            }
        },
        {
            label: <span>Đổi mật khẩu</span>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: 'Đăng xuất',
            key: '3',
            onClick: () => {
                logout()
                navigate("/")
            }

        },
    ];

    const detailProductPage = (value: number | string) => {
        window.document.location.replace(`/chi-tiet-san-pham/${Number(value)}`)
    }

    const renderItem = (producId: number | string, nameProduct: string, price: number, image: string) => {
        return (
            {
                value: nameProduct,
                label: (
                    <Row gutter={[20, 10]} onClick={() => detailProductPage(producId)}>
                        <Col span={6}>
                            <img style={{ objectFit: "contain", width: "100%" }} src={image} alt="image" />
                        </Col>
                        <Col span={18}>
                            <div>{nameProduct}</div>
                            <div>Giá tiền: {formatCurrencyVN(price)}</div>
                        </Col>
                    </Row>
                )

            }
        )
    }

    const onSearchProduct = (search: string) => {
        setNameSearch(search)
        dispatch(getProductByName(search))
    }




    const options = [
        dataSearchName != undefined ?
            {
                label: (
                    <div>
                        <div>Sản phẩm</div>
                    </div>
                ),
                options: data.map((product: IProductProps) => {
                    return renderItem(product.id, product.name, product.price, product.imageUrl)
                })
            }
            : {}
    ]

    const onMouseEnter = (e: KeyboardEvent) => {
        e.preventDefault();
        if (e.code == "Enter") {
            navigate(`/do-gia-dung?name=${nameSearch}`)
        }
    }




    // useEffect(() => {
    //     dispatch(getProductsBySearch({ page: 1, size: 5 }))
    // }, [])




    return (
        <Row style={Header}>
            <Col span={24}>
                <Row style={HeaderContainer}>
                    <Col md={4}>
                        <img src="/assets/logo.jpg" alt="logoStore" width={"120px"} />
                    </Col>
                    <Col md={12} style={{ margin: "auto 0" }}>
                        <AutoComplete
                            popupClassName="certain-category-search-dropdown"
                            popupMatchSelectWidth={500}
                            style={{ width: "100%" }}
                            onSearch={onSearchProduct}
                            options={options}
                            onKeyUp={onMouseEnter}
                        >
                            <Input.Search size="large" placeholder="Tìm kiếm ở đây" />
                        </AutoComplete>
                    </Col>
                    <Col md={5} style={{ margin: "auto" }}>
                        <p style={{ textAlign: "center" }}>
                            Hotline: 029474738
                        </p>
                    </Col>


                    {/* <Col md={2} style={{ margin: "auto" }}> */}

                    {/* <ShoppingCartOutlined style={{ fontSize: 25, color: "orange" }} /> */}
                    {/* </Col> */}
                    <Col md={3} style={{ margin: "auto", textAlign: "center" }}>

                        {
                            cookie.get("jwt-token") != null ?
                                <Dropdown menu={{ items }} trigger={["click"]}>
                                    <UserOutlined style={{ cursor: "crosshair", fontSize: 25, color: "orange" }} />
                                </Dropdown>
                                :
                                <NavLink to={"/login"}>
                                    Đăng nhập
                                </NavLink>
                        }
                    </Col>

                </Row>
                <Row >
                    <Col span={24}>
                        <Row style={SubHeader}>
                            <Col span={6}>
                                <div className="sub-header-item">
                                    <NavLink style={styleNavLink} to={"/"}>Trang chủ</NavLink>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="sub-header-item">
                                    <NavLink style={styleNavLink} to={"/bai-viet"}>Blog</NavLink>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="sub-header-item">
                                    <NavLink style={styleNavLink} to={"/do-gia-dung"}>Đồ gia dụng</NavLink>
                                </div>

                            </Col>
                            <Col span={6}>
                                <div className="sub-header-item">
                                    <NavLink style={styleNavLink} to={"/contact"}>Liên hệ</NavLink>
                                </div>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Col >
        </Row >
    )
}

export default Header