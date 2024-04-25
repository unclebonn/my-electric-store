import { Button, Form, Input, Select } from "antd"
import React, { useEffect } from "react"
import { ISignUpProps } from "../../shared/models/auth"
import { useAppDispatch, useAppSelector } from "../../config/store"
import { reset, signup } from "../../shared/reducer/authentication.reducer"
import { toast } from "react-toastify"

const SignUpComponent: React.FC = () => {

    const dispatch = useAppDispatch()
    const message = useAppSelector(state => state.authentication.message) as string
    const isLoading = useAppSelector(state => state.authentication.loading)

    const onSubmitSignUpForm = (form: ISignUpProps) => {
        const newForm = {
            ...form,
            "status": true,
            "roleId": 2
        }

        dispatch(signup(newForm))




    }

    useEffect(() => {
        if (message.includes("Tạo tài khoản thành công")) {
            toast.success(message)
            dispatch(reset())
            window.document.location.replace("/login")
        }
    }, [message])



    return (
        <Form
            labelCol={{ span: "7" }}
            wrapperCol={{ span: "auto" }}
            onFinish={onSubmitSignUpForm}

        >
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    { required: true, message: "Vui lòng nhập email" },
                    { whitespace: true }
                ]}
            >
                <Input type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu" },

                ]}
            >
                <Input type="password" placeholder="Mật khẩu" />
            </Form.Item>
            <Form.Item
                name="name"
                label="Tên người dùng"
                rules={[
                    { required: true, message: "Vui lòng nhập tên người dùng" }
                ]}
            >
                <Input type="text" placeholder="Tên người dùng" />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" }
                ]}
            >
                <Input type="text" placeholder="Số điện thoại" />
            </Form.Item>
            <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[
                    { required: true, message: "Vui lòng nhập địa chỉ" }
                ]}
            >
                <Input type="text" placeholder="Địa chỉ" />
            </Form.Item>
            <Form.Item
                name="dateOfBirth"
                label="Ngày sinh"
                rules={[{
                    required: true, message: "Vui lòng nhập ngày sinh"
                }]}
            >
                <Input type="date" />
            </Form.Item>
            <Form.Item
                name="gender"
                label="Giới tính"
                rules={[
                    { required: true, message: "Vui lòng chọn giới tính" }
                ]}
            >
                <Select
                    options={[
                        { label: "Nam", value: "Male" },
                        { label: "Nữ", value: "Female" },
                    ]}
                />
            </Form.Item>
            <Button loading={isLoading} style={{ width: "100%", height: "auto" }} size="large" htmlType="submit">Đăng ký</Button>
        </Form>
    )
}

export default SignUpComponent