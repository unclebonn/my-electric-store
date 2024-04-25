import { Col, List, Row } from "antd"
import React from "react"

const Footer: React.FC = () => {

    const Footer: React.CSSProperties = {
        marginTop:"30px",
        width: "100%",
        backgroundColor: "#e6d5b7",
        position:"relative",
        bottom:0,
        left:0,
        right:0
    }

    const FooterContainer: React.CSSProperties = {
        width: "1100px",
        margin: "0 auto",
    }

    const ColStyle: React.CSSProperties = {
       textAlign:"center"
    }

    return (
        <Row style={Footer}>
            <Col span={24}>
                <Row style={FooterContainer}>
                    <Col style={ColStyle} span={8}>
                        <p>Bảo hành</p>
                        <p>Bảo hành</p>
                        <p>Bảo hành</p>
                        <p>Bảo hành</p>
                        <p>Bảo hành</p>
                        <p>Bảo hành</p>
                    </Col>
                    <Col style={ColStyle} span={8}>
                        <p>Bảo hành</p>
                        <p>Bảo hành</p>
                        <p>Bảo hành</p>
                        <p>Bảo hành</p>
                        <p>Bảo hành</p>
                        <p>Bảo hành</p>
                    </Col>
                    <Col style={ColStyle} span={8}>
                        <p>Bảo hành</p>
                        <p>Bảo hành</p>
                        <p>Bảo hành</p>
                        <p>Bảo hành</p>
                        <p>Bảo hành</p>
                        <p>Bảo hành</p>
                    </Col>


                </Row>
            </Col>
        </Row>
    )
}

export default Footer