import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
} from "reactstrap";

const BlogItem = () => {
    const { id } = useParams();

    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/blog/" + id)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch blog");
                }
                return response.json();
            })
            .then((data) => {
                setBlog(data);
            });
    }, []);

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <div className="text-center">
                {" "}
                {/* Center the image */}
                <CardImg
                    top
                    src={`http://localhost:3000/${blog.imgUrl}`}
                    alt={blog.title}
                    style={{
                        maxWidth: "25%",
                        margin: "auto",
                        borderRadius: "5%",
                    }}
                />
            </div>
            <CardBody>
                <CardTitle
                    tag="h2"
                    style={{
                        color: "#000d6b",
                        fontFamily: "Arial, sans-serif",
                    }}
                >
                    {blog.title}
                </CardTitle>
                <CardSubtitle tag="h5" className="mb-2 text-muted">
                    By {blog.author} on {blog.date}
                </CardSubtitle>
                <CardText>{blog.description}</CardText>
            </CardBody>
        </Card>
    );
};

export default BlogItem;
