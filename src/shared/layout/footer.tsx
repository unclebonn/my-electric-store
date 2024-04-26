import { Col, List, Row } from "antd"
import React from "react"

const Footer: React.FC = () => {

    const Footer: React.CSSProperties = {
        marginTop: "30px",
        width: "100%",
        backgroundColor: "#e6d5b7",
        position: "relative",
        bottom: 0,
        left: 0,
        right: 0,
        padding:40
    }

    const FooterContainer: React.CSSProperties = {
        width: "1100px",
        margin: "0 auto",
    }

    const ColStyle: React.CSSProperties = {
        textAlign: "center"
    }

    return (
        <Row  style={Footer}>
            <Col span={24}>
                <Row style={FooterContainer}>
                    <Col style={ColStyle} span={8}>
                        <p>Tích điểm Quà tặng VIP</p>
                        <p>Lịch sử mua hàng</p>
                        <p>Tìm hiểu về mua trả góp</p>
                        <p>Chính sách bảo hành</p>
                        <p>Xem thêm</p>
                    </Col>
                    <Col style={ColStyle} span={8}>
                        <p>Giới thiệu công ty</p>
                        <p>Tuyển dụng</p>
                        <p>Gửi góp ý, khiếu nại</p>
                        <p>Xem bản mobile</p>
                    </Col>
                    <Col style={ColStyle} span={8}>
                        <h4>Tổng đài hỗ trợ</h4>
                        <p>Gọi mua: 1900 232 460 (7:30 - 22:00)</p>
                        <p>Khiếu nại: 1800.1062 (8:00 - 21:30)</p>
                        <p>Bảo hành: 1900 232 464 (8:00 - 21:00)</p>
                    </Col>


                </Row>
            </Col>
        </Row>
    )
}

export default Footer