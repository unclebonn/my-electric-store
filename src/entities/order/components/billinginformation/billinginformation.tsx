import React, { useEffect, useState } from "react"
import "./billinginformation.scss"
import { Button, Checkbox, Col, Divider, Form, GetProp, Input, Row, Tabs, TabsProps } from "antd"
import Cookies from "universal-cookie"
import { IAccountProps } from "../../../../shared/reducer/authentication.reducer"
import { formatCurrencyVN } from "../../../../shared/utils/formatCurrency"
import dayjs from "dayjs"
import { ExtraInformation, IOrderProps } from "../../../../shared/models/order"
import { ICartDetail } from "../../../cart/components/cartdetail"
import { useAppDispatch, useAppSelector } from "../../../../config/store"
import { createsubmitpayment, getPaymentVnpay, reset } from "../../order.reducer"
import { AxiosResponse } from "axios"
import { deleteAllProductInCart } from "../../../cart/cart.reducer"
import { toast } from "react-toastify"
import { useNavigate, useNavigation } from "react-router-dom"

interface BillingInformationProps {
    totalPrice: number,
    detailincart: ICartDetail[]
}

const BillingInformation: React.FC<BillingInformationProps> = (props) => {
    const cookie = new Cookies()
    const account = cookie.get("account") as IAccountProps
    const totalPrice = props.totalPrice
    const detailincart = props.detailincart
    const [loadmore, setLoadMore] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>("tienmat")
    const dispatch = useAppDispatch();

    const message = useAppSelector(state => state.order.message) as String;


    const navigate = useNavigate()



    const onChange = (paymentMethod: string) => {
        setPaymentMethod(paymentMethod)
    };


    const items: TabsProps['items'] = [
        {
            key: 'tienmat',
            label: 'Tiền mặt',
            children: <div>
                Vui lòng nhớ để ý số điện thoại để nhận đơn hàng bạn nhé. Shop cảm ơn nhiều !
                <Button htmlType="submit" style={{ margin: '20px' }} size="large">Xác nhận thanh toán</Button>
            </div>
        },
        {
            key: 'qrcode',
            label: 'QR code',
            children: <div>
                <p>
                    Nội dung chuyển khoản: Tên + số điện thoai
                </p>

                <img src={`https://img.vietqr.io/image/vietinbank-100873099247-compact2.jpg?amount=${totalPrice}&addInfo=thanh%20toan%20hoa%20don&accountName=Tran%20Anh%20Khoi`} alt="qrcode" />

                <p>Vui lòng đợi nhân viên gọi xác nhận nhé. Shop cảm ơn!</p>
                <Button htmlType="submit" style={{ margin: '20px' }} size="large">Xác nhận thanh toán</Button>

            </div>,
        },
        {
            key: 'vnpay',
            label: 'Chuyển khoản',
            children: <div>
                <Button htmlType="submit" shape="default">Vui lòng nhấn nút để sang trang thanh toán</Button>
            </div>,
        },
    ];

    const dataInCartFilter = detailincart.map((product) => {
        return {
            productId: product.productId,
            quantity: product.quantity,
            price: product.price,
        }
    })

    const onAcceptedSubmit = (formSubmit: ExtraInformation) => {


        const form = {
            phoneCustomer: formSubmit.phoneCustomer ? formSubmit.phoneCustomer : account.phone,
            nameCustomer: formSubmit.nameCustomer ? formSubmit.nameCustomer : account.name,
            addressCustomer: formSubmit.addressCustomer ? formSubmit.addressCustomer : account.address,
            orderDetails: dataInCartFilter as any,
            status: 2,
            paymentName: paymentMethod,
            userId: account.id,
            orderDate: dayjs()
        }

        switch (paymentMethod) {
            case "tienmat": {
                dispatch(createsubmitpayment(form));

                break;
            }
            case "qrcode": {
                dispatch(createsubmitpayment(form));
                break;
            }
            case "vnpay":
                {
                    const result = async () =>
                        await dispatch(createsubmitpayment(form));

                    const response = result();
                    response
                        .then((res: any) => {
                            const data = res.payload.data.data as any
                            const userId = data.userId
                            const orderId = data.orderId

                            const result = dispatch(getPaymentVnpay({ userId, device: 1, orderId }))
                            result.then((res: any) => {
                                const vnpayLink = res.payload.data
                                window.document.location.replace(vnpayLink) //thay thế link vnpay vao

                            })


                        })
                        .catch((error) => {
                            console.log(error);

                        })


                }
                break;

            default:
                break;
        }
    }

    console.log(message);
    

    useEffect(() => {
        if (message.includes("Mua hàng thành công. Xin cảm ơn")) {
            reset()
            toast.success("Mua thành công xin vui lòng đợi nhân viên xác thực nhé")
            dispatch(deleteAllProductInCart(account.id))
        }
    }, [message])



    return (
        <>

            <>
                <Form
                    wrapperCol={{ span: 17 }}
                    labelCol={{ span: 7 }}
                    onFinish={onAcceptedSubmit}
                >
                    <div className="billingform">
                        <div style={{ textAlign: "center", paddingTop: "10px" }}>
                            <h2>Thông tin thanh toán</h2>
                        </div>
                        <Divider dashed type="horizontal" />
                        <div className="customerinformation">
                            <Row className="customerinformation-cover">
                                <Col span={12}>
                                    <label htmlFor="">Ngày: </label>
                                </Col>
                                <Col span={12}>
                                    {dayjs().format("DD/MM/YYYY")}
                                </Col>
                            </Row>
                            <Row className="customerinformation-cover">
                                <Col span={12}>
                                    <label htmlFor="">Tên: </label>
                                </Col>
                                <Col span={12}>
                                    {account.name}
                                </Col>
                            </Row>
                            <Row className="customerinformation-cover">
                                <Col span={12}>
                                    <label htmlFor="">Địa chỉ: </label>
                                </Col>
                                <Col span={12}>
                                    {account.address}
                                </Col>
                            </Row>
                            <Row className="customerinformation-cover">
                                <Col span={12}>
                                    <label htmlFor="">Số điện thoại: </label>
                                </Col>
                                <Col span={12}>
                                    {account.phone}
                                </Col>
                            </Row>
                        </div>
                        <div style={{ textAlign: "center", margin: "10px" }}>
                            <Button onClick={() => setLoadMore(!loadmore)} size="middle">Sửa thông tin</Button>
                        </div>
                        {
                            loadmore ?
                                <div className="customerinformation">
                                    <Row className="customerinformation-cover">
                                        <Col span={24}>
                                            <Form.Item
                                                label="Tên người nhận"
                                                name="nameCustomer"
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label="Địa chỉ"
                                                name="addressCustomer"
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label="Số điện thoại "
                                                name="phoneCustomer"
                                                rules={[{
                                                    min: 10, max: 10, message: "Vui lòng nhập đủ 10 số"
                                                }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                                : <></>
                        }
                        <Divider dashed type="horizontal" plain style={{ border: "1px dashed #c7c6c6" }} />
                        <div style={{ textAlign: "center", paddingTop: "10px" }}>
                            <h2>Phương thức thanh toán</h2>
                        </div>


                        <div style={{ margin: "18px" }}>
                            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                        </div>


                        <div style={{ margin: "18px" }}>
                            <Row className="customerinformation-cover" style={{ fontWeight: "bold" }}>
                                <Col span={12}>
                                    <label htmlFor=""  > Tổng tiền</label>
                                </Col>
                                <Col span={12}>
                                    {formatCurrencyVN(totalPrice)}
                                </Col>
                            </Row>
                        </div>
                    </div >
                </Form>
            </>
        </>
    )
}

export default BillingInformation