import HTMLReactParser from "html-react-parser"
import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../config/store"
import { Skeleton } from "antd"
import { getBlogDetail } from "./blog.reducer"
import { toast } from "react-toastify"

const BlogDetail: React.FC = () => {
    const { id } = useParams()

    const blogdetail = useAppSelector(state => state.blog.dataDetail)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (id == undefined) {
            toast.warning("Bài viết hiện không có")
            navigate("/bai-viet")
        } else {
            dispatch(getBlogDetail(id!))
        }
    }, [])

    return (
        blogdetail != null ?
            <div style={{marginTop:30, padding:30, border:"1px solid rgba(0,0,0,0.3)", borderRadius:"10px"}}>
                <div>{HTMLReactParser(blogdetail.data.blog.title)}</div>
                <div>
                    {HTMLReactParser(blogdetail.data.blog.content)}
                </div>
            </div>
            : <Skeleton />
    )
}

export default BlogDetail