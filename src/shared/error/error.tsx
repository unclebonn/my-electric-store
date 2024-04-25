import { Col, Row } from "antd"
import React from "react"

const ErrorPage: React.FC = () => {
    return (
        <Row>
            <Col md={24}>
                <Row style={{height:"412px"}}>
                    <Col span={8}>
                        <img width={"100%"} src="/assets/error.jpg" alt="error_page" />
                    </Col>
                    <Col style={{ paddingLeft: "30px", margin: "auto" }} span={16}>
                        <h1 style={{ fontFamily: "fantasy", color: "orange", fontSize: 100 }}>
                            Page not found
                        </h1>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default ErrorPage