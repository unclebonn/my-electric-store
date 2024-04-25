import { Card, Col, Image, Row, Skeleton } from "antd"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../config/store"
import { getAllBlog } from "./blog.reducer"
import HTMLReactParser from "html-react-parser"
import Meta from "antd/es/card/Meta"
import { useNavigate } from "react-router-dom"

const Blog: React.FC = () => {

    const dispatch = useAppDispatch()
    const loading = useAppSelector(state => state.blog.loading);
    const data = useAppSelector(state => state.blog.data);
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllBlog())
    }, [])




    const titleStyle: React.CSSProperties = {
        overflow: "hidden",
        display: "-webkit-box",
        textOverflow: "ellipsis",
        height: "50px",
        WebkitLineClamp: 1,
        WebkitBoxOrient: "vertical",
    }
    const descriptionStyle: React.CSSProperties = {
        overflow: "hidden",
        display: "-webkit-box",
        textOverflow: "ellipsis",
        height: "100px",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",


    }


    const navigateBlogDetail = (blogid: string | number) => {
        navigate(`/bai-viet/chitiet/${blogid}`)
    }


    return (
        <Skeleton loading={loading} style={{ height: "382px", marginTop: "30px" }}>
            <Row style={{ marginTop: "20px" }} gutter={[20, 20]}>
                {
                    data?.data != null ? data.data.blogs.map((blog: any) => {
                        return (
                            <Col span={8}>
                                <Card
                                    onClick={() => navigateBlogDetail(blog.id)}
                                    hoverable
                                    style={{ width: "100%" }}
                                    cover={
                                        <img
                                            width={"100%"}
                                            height={"200px"}
                                            style={{ objectFit: "cover" }}
                                            alt="example"
                                            src={blog.imageUrl}
                                        />
                                    }
                                >
                                    <Meta
                                        title={
                                            <div style={titleStyle}>
                                                {HTMLReactParser(String(blog.title))}
                                            </div>
                                        }
                                        description={
                                            <div style={descriptionStyle}>
                                                {HTMLReactParser(String(blog.content))}
                                            </div>
                                        }
                                    />
                                </Card>
                            </Col>
                        )
                    })
                        : <>
                            <img src="/assets/network.png" width={"500px"} height={"200px"} />
                        </>
                }

            </Row>
        </Skeleton>
    )
}
export default Blog