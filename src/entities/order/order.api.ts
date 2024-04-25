import { url } from "../../shared/utils/constant";

export const ORDER = {
    CUSTOMER: {
        SUBMITPAYMENT: `${url}/Order/create`,
        GETORDERBYUSERID: `${url}/Order/GetByUserId`,
        GETORDERDETAILBYUSERID: `${url}/Order/getorderdetailsbyorderid`
    }
}