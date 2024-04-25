import { Button, Col, Form, Input, Row } from "antd"
import React, { useEffect, useState } from "react"
import { ILoginProps } from "../../shared/models/auth"
import { useAppDispatch, useAppSelector } from "../../config/store"
import { login } from "../../shared/reducer/authentication.reducer"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Cookies from "universal-cookie"
import SignUpComponent from "../components/signup"
import LoginComponent from "../components/login"
import { toast } from "react-toastify"



const Login: React.FC = () => {

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(state => state.authentication.loading);
    const loginError = useAppSelector(state => state.authentication.loginError);

    const [isSignUp, setIsSignUp] = useState<boolean>(false)

    const navigate = useNavigate()
    const cookies = new Cookies()




    const backgroundLoginStyle: React.CSSProperties = {
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(199 141 55 / 54%)"
    }

    const onChangeFormLogin = (auth: ILoginProps) => {
        dispatch(login(auth.email, auth.password))

    }


    const onChangeSignUp = () => {
        setIsSignUp(!isSignUp)
    }

    useEffect(() => {
        if (cookies.get("jwt-token") != null) {
            toast.success("Đăng nhập thành công !")
            navigate("/")
        }
    }, [isLoading, loginError, dispatch])


    return (
        <Row>
            <Col md={8} style={backgroundLoginStyle} className="background-login"></Col>
            <Col md={16} className="login-form" style={{ width: "450px", margin: "auto", display: "grid", justifyContent: "center" }}>
                <Row style={{ margin: "10px 0px" }}>
                    <Col span={24}>
                        <h2>Xin chào bạn!</h2>
                        <p>Vui lòng nhập thông tin đăng nhập/đăng ký của bạn!</p>
                    </Col>
                </Row>
                {loginError ? <p style={{ color: "red" }}>Tài khoản hoặc mật khẩu sai</p> : <></>}
                <Row style={{ margin: "10px 0px" }}>
                    <Col md={24}>
                        {
                            isSignUp
                                ?
                                <SignUpComponent />
                                : <LoginComponent isLoading={isLoading} onChangeFormLogin={onChangeFormLogin} />
                        }

                    </Col>
                </Row>
                <Row style={{ margin: "10px 0px" }}>



                    {isSignUp ?
                        <Col md={24}>
                            <span>
                                Bạn đã có tài khoản?
                                <a onClick={() => onChangeSignUp()}>&nbsp;Đăng nhập ở đây</a>
                            </span>
                            {loginError ? <p color="red">Đăng nhập sai</p> : <></>}
                        </Col>
                        :
                        <Col md={24}>
                            <span>
                                Bạn chưa có tài khoản?
                                <a onClick={() => onChangeSignUp()}>&nbsp;Đăng ký ở đây</a>
                            </span>
                        </Col>
                    }
                </Row>
            </Col>
        </Row>
    )
}

export default Login