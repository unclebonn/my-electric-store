import { ReducersMapObject } from "@reduxjs/toolkit";
import authentication from "./authentication.reducer";
import product from "../../entities/product/product.reducer";
import cart from "../../entities/cart/cart.reducer";
import order from "../../entities/order/order.reducer";
import profile from "../../entities/profile/profile.reducer";
import blog from "../../entities/blogs/blog.reducer";
import category from "../../entities/category/category.reducer";

const rootReducer: ReducersMapObject = {
    authentication,
    product,
    cart,
    order,
    profile,
    blog,
    category
}


export default rootReducer