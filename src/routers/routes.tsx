import { Route, Routes } from "react-router-dom"
import Home from "../modules/home/home"
import ErrorPage from "../shared/error/error"
import ProductDetail from "../entities/product-detail/ProductDetail"
import Login from "../modules/login/login"
import Header from "../shared/layout/header/header"
import Footer from "../shared/layout/footer"
import { Button, Divider, FloatButton, Popover, Row } from "antd"
import { Cart, CartWithoutLogin } from "../entities/cart/Cart"
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import { useAppDispatch, useAppSelector } from "../config/store"
import { deleteAllProductInCart, getCartByUserId } from "../entities/cart/cart.reducer"
import "./routes.scss"
import Order from "../entities/order/Order"
import { Product } from "../entities/product/product"
import Profile from "../entities/profile/Profile"
import Blog from "../entities/blogs/Blog"
import BlogDetail from "../entities/blogs/BlogDetail"

const AppRoutes = () => {
    const cookie = new Cookies();
    const account = cookie.get("account");
    const dispatch = useAppDispatch()
    const productsInCart = useAppSelector(state => state.cart.dataDetail);
    const isLoading = useAppSelector(state => state.cart.loading);
    const [isOpenCart, setIsOpenCart] = useState<boolean>(false)

    useEffect(() => {
        if (account != null) {
            dispatch(getCartByUserId(account.id))
        }
    }, [isOpenCart])

    const onClickDeleteAllProductInCart = () => {
        dispatch(deleteAllProductInCart(account.id))
    }

    return (
        <>
            <Header />
            <div className='app-container'>
                <Routes>
                    <Route path="/" >
                        <Route index element={<Home />} />
                        <Route path="/do-gia-dung" element={<Product />} />
                        <Route path="/bai-viet">
                            <Route index element={<Blog />} />
                            <Route path="chitiet/:id" element={<BlogDetail />} />
                        </Route>
                        <Route path="/ho-so" element={<Profile />} />
                        <Route path="/chi-tiet-san-pham/:id" element={<ProductDetail />} />
                        <Route path="/thanh-toan" element={<Order accountId={account?.id} />} />
                    </Route>
                    <Route path="*" element={<ErrorPage />} />

                </Routes>
            </div>
            <Footer />
            <Popover
                placement="topLeft"
                trigger={["hover"]}
                // open={isOpenCart}
                title={<Row style={{ justifyContent: "space-between" }}>
                    <div>Giỏ hàng</div>
                    <div onClick={() => onClickDeleteAllProductInCart()}>
                        {account != null ?
                            <button className="deleteall" style={{ border: "none", padding: "5px 15px", backgroundColor: "indianred" }}>Xoá tất cả <DeleteOutlined /> </button>
                            : <></>
                        }
                    </div>
                </Row>}
                content={account != null ? <Cart accountId={account?.id} dataCart={productsInCart} isLoading={isLoading} /> : <CartWithoutLogin />}
            >

                <FloatButton
                    style={{ height: "50px", width: "50px" }}
                    onMouseEnter={() => setIsOpenCart(!isOpenCart)}
                    icon={
                        <>
                            <div className="icon">
                                <div className="circle-quantity">{productsInCart.data ? productsInCart.data.length : 0}</div>
                            </div>
                            <ShoppingCartOutlined />
                        </>
                    }
                >
                </FloatButton>
            </Popover>
        </>
    )

}

export default AppRoutes