import { Button, Col, DatePicker, Divider, Form, Image, Input, List, Modal, Row, Select, Skeleton, Table, TableProps, Tabs, TabsProps, Tag } from "antd"
import React, { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import { IAccountProps } from "../../shared/reducer/authentication.reducer";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { getProfile, reset, updateProfile } from "./profile.reducer";
import { toast } from "react-toastify";
import { getHistoryOrder, getOrderDetail, updateStatusOrdeCancel } from "../order/order.reducer";
import { formatCurrencyVN } from "../../shared/utils/formatCurrency";
import 'dayjs/locale/vi';
import "./profile.scss"
import { formatDate } from "../../shared/utils/date/formatDate";

export interface UpdateProfileProps {
    id: number | string,
    name: string,
    email: string,
    phone: string,
    dateOfBirth: string,
    gender: string,

}



interface OrderDetail {
    expiredWarranty: string,
    price: number,
    quantity: number,
    product: {
        id: number,
        imageUrl: string,
        name: string
    }
}
const Profile: React.FC = () => {



    const cookie = new Cookies();
    const account = cookie.get("account") as IAccountProps
    const [edit, setEdit] = useState<boolean>(true)
    const dateFormat = 'DD/MM/YYYY';
    const dispatch = useAppDispatch()


    const dataDetail = useAppSelector(state => state.profile.dataDetail);
    const orderDetail = useAppSelector(state => state.order.dataDetail);
    const dataAccount = dataDetail?.data! as IAccountProps


    const dataOrder = useAppSelector(state => state.order.data)
    const orders = dataOrder?.data


    const [ispopup, setIsPopup] = useState<boolean>(false)




    const formUpdateProfile = (form: UpdateProfileProps) => {
        setEdit(!edit)
        const newForm = {
            ...form, id: account.id, dateOfBirth: form.dateOfBirth != null ? new Date(form.dateOfBirth).toISOString() : account.dateOfBirth
        }
        dispatch(updateProfile(newForm))
        toast.success("Cập nhật thành công")

    }

    useEffect(() => {
        dispatch(getHistoryOrder(account.id))
        dispatch(getProfile(account.id))
    }, [])

    const getorderdetail = (orderId: string | number) => {
        dispatch(getOrderDetail(orderId))
        setIsPopup(true)
    }



    const columnDetail: TableProps<OrderDetail>['columns'] = [
        {
            title: 'Thời gian bảo hành',
            dataIndex: 'expiredWarranty',
            key: 'expiredWarranty',
            render(value, record, index) {
                return <span>{formatDate(value)}</span>
            },
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'product',
            key: 'product',
            render(value, record, index) {
                return (
                    <div>{record.product.name}</div>
                )
            },
        },
        {
            title: 'Giá tiền',
            key: 'price',
            dataIndex: 'price',
            render(value, record, index) {
                return <span>{formatCurrencyVN(value)}</span>
            },
        },
        {
            title: 'Số lượng',
            key: 'quantity',
            dataIndex: 'quantity',

        },

    ];

    const updateStatusCancel = (orderid: number) => {
        dispatch(updateStatusOrdeCancel({ accountid: account.id, orderid }))
        toast.success("Huỷ đơn hàng thành công")
    }



    const item: TabsProps['items'] = [
        {
            label: "Hồ sơ",
            key: "1",
            children: <Row gutter={[20, 20]}>
                <Col span={24}>
                    <Row style={{ margin: "0px 0px 20px 0px", justifyContent: "right" }}>
                        {edit
                            ?
                            <Button onClick={() => setEdit(!edit)}>Sửa thông tin</Button>
                            :
                            <></>
                        }
                    </Row>
                </Col>
                <Col span={8}>
                    <Image
                        style={{ borderRadius: "50%" }}
                        width={200}
                        height={200}
                        src={account.avatarUrl ? account.avatarUrl : "error"}
                        fallback="data:image/png;base64,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"
                    />
                </Col>
                <Col span={16}>
                    <Row>
                        <Col span={24}>
                            {
                                dataAccount != undefined ?
                                    <Form
                                        onFinish={formUpdateProfile}
                                    >
                                        <Form.Item
                                            label="Tên"
                                            name="name"
                                            initialValue={dataAccount?.name}
                                        >
                                            <Input type="text" disabled={edit} defaultValue={dataAccount?.name} />
                                        </Form.Item>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            initialValue={dataAccount?.email}
                                        >
                                            <Input type="email" disabled={edit} defaultValue={dataAccount?.email} />
                                        </Form.Item>
                                        <Form.Item
                                            label="Số điện thoại"
                                            name="phone"
                                            initialValue={dataAccount?.phone}
                                        >
                                            <Input type="text" disabled={edit} defaultValue={dataAccount?.phone} />
                                        </Form.Item>
                                        <Form.Item
                                            label="Ngày sinh"
                                            name="dateOfBirth"
                                        >
                                            <DatePicker defaultValue={dayjs(dayjs(dataAccount?.dateOfBirth), dateFormat)} format={dateFormat} disabled={edit} />
                                        </Form.Item>
                                        <Form.Item
                                            label="Giới tính"
                                            name="gender"
                                            initialValue={dataAccount?.gender}
                                        >
                                            <Select
                                                disabled={edit} defaultValue={dataAccount?.gender}
                                                options={[
                                                    { label: "Nam", value: "Male" },
                                                    { label: "Nữ", value: "Female" },
                                                ]}
                                            />
                                        </Form.Item>

                                        {edit ? <></> :
                                            <Row>
                                                <Form.Item>
                                                    <Button htmlType="submit">Cập nhật</Button>
                                                </Form.Item>
                                                <Button style={{ marginLeft: "10px" }} htmlType="submit" onClick={() => setEdit(!edit)}>Huỷ</Button>
                                            </Row>
                                        }

                                    </Form>
                                    : <Skeleton />
                            }

                        </Col>
                    </Row>
                </Col>
            </Row>
        },
        {
            label: "Lịch sử mua hàng",
            key: "2",
            children: <List
                style={{ height: "500px", maxHeight: "450px", overflowY: "scroll" }}
                size="large"
                bordered
                dataSource={orders}
                renderItem={(item: any, index: number) =>
                    <div style={index % 2 == 0 ? { backgroundColor: "rgba(0,0,0,0.04)" } : { backgroundColor: "white" }}>
                        <div onClick={() => getorderdetail(item.orderId)} className="listItem" >
                            <List.Item style={{ cursor: "pointer", display: "block" }}>
                                <Row>
                                    <Col span={24} style={{ textAlign: "right" }}>
                                    {item.paymentName == "tienmat" ? <Tag color="blue">Tiền mặt</Tag> : item.paymentName == "qrcode" ? <Tag color="blue">QR Code</Tag> : <Tag color="blue">VN Pay</Tag>}
                                        {item.status == 1 ? <Tag color="blue">Thành công</Tag> : item.status == 2 ? <Tag color="yellow">Đang xử lý</Tag> : <Tag color="red">Đã huỷ</Tag>}
                                    </Col>
                                    <Col span={24}>
                                        <Row style={{ justifyContent: "space-between" }}>
                                            <Col span={12} >
                                                Mã đơn hàng: {item.orderId}
                                            </Col>
                                            <Col span={12}>
                                                {formatDate(item.orderDate)}
                                                {/* {dayjs(item.orderDate).locale('vi').format('dddd, DD/MM/YYYY HH:mm:ss').toLocaleUpperCase()} */}
                                            </Col>

                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row>
                                            Tên khách hàng: {item.nameCustomer}
                                        </Row>
                                        <Row>
                                            Địa chỉ: {item.addressCustomer}
                                        </Row>
                                        <Row>
                                            Số điện thoại: {item.phoneCustomer}
                                        </Row>
                                    </Col>

                                    <Col span={24} style={{ textAlign: "right" }}>
                                        <h3>Tổng tiền: <span style={{ color: "red" }}>{formatCurrencyVN(item.totalPrice)}</span></h3>

                                    </Col>


                                </Row>
                            </List.Item>
                        </div>
                        <Col span={24} style={{ textAlign: "right" }}>
                            {item.status == 2 ? <Button onClick={() => updateStatusCancel(item.orderId)} style={{ backgroundColor: "red", color: "white" }} type="default">Huỷ đơn</Button> : <></>}

                        </Col>
                    </div>


                }
            />,
        },
    ]


    return (

        <>
            <Modal footer={<></>} width={900} title="Chi tiết đơn hàng" open={ispopup} onCancel={() => setIsPopup(!ispopup)}>
                <Table pagination={false} columns={columnDetail} dataSource={orderDetail?.data} />
            </Modal>
            <Row style={{ margin: "50px", marginTop: 100 }}>
                <Col md={24}>
                    <Tabs
                        defaultActiveKey="2"
                        size="large"
                        tabPosition={"left"}
                        items={item}
                    />
                </Col>
            </Row>
        </>

    )
}

export default Profile