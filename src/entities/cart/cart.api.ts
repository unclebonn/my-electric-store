import { url } from "../../shared/utils/constant";

export const CART = {
    CUSTOMER: {
        ADDINGPRODUCT: `${url}/Cart/add-product-into-cart`,
        GETCARTPRODUCT: `${url}/Cart/get-by-user-id`,
        DELETEALLPRODUCTINCART: `${url}/Cart/delete-all-carts-by-user-id`,
        DELETEPRODUCTINCART: `${url}/Cart/delete-product-id-by-user-id`,
        UPDATEQUANTITYPRODUCT: `${url}/Cart/update-quantity-by-productid-and-userid`

    }
}