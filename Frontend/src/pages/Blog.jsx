import React, { useContext, useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import BlogList from "../components/UI/BlogList";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
    const [newBlog, setNewBlog] = useState({
        id: "",
        title: "",
        description: "",
        author: "",
        imgUrl: null,
    });

    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();

    const { user, loading } = useContext(AuthContext);

    useEffect(() => {
        if (!user && !loading) {
            alert("You are not authorized to view this page");
            navigate("/login");
        }
    }, [user, loading]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBlog({ ...newBlog, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewBlog({ ...newBlog, imgUrl: file });
        }
    };

    const handleDeleteBlog = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3000/api/blog/${id}`,
                {
                    method: "DELETE",
                }
            );
            if (response.ok) {
                console.log("Blog deleted successfully");
                window.location.reload();
            } else {
                console.error("Failed to delete blog");
            }
        } catch (error) {
            console.error("Failed to delete blog:", error);
        }
    };

    const handleEditBlog = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        console.log("newBlog", newBlog);

        formData.append("title", newBlog.title);
        formData.append("description", newBlog.description);
        formData.append("author", newBlog.author);
        if (newBlog.imgUrl) {
            formData.append("file", newBlog.imgUrl); // Append file
        } else {
            console.error("No file selected for imgUrl");
        }

        // Debugging: Log FormData entries
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await fetch(
                "http://localhost:3000/api/blog/" + newBlog._id,
                {
                    method: "PUT",
                    body: formData,
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("Blog added:", data);
                setNewBlog({
                    title: "",
                    description: "",
                    author: "",
                    imgUrl: null,
                });
                window.location.reload();
            } else {
                console.error("Error adding blog:", response.statusText);
            }
        } catch (error) {
            console.error("Error adding blog:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", newBlog.title);
        formData.append("description", newBlog.description);
        formData.append("author", newBlog.author);
        if (newBlog.imgUrl) {
            formData.append("file", newBlog.imgUrl); // Append file
        } else {
            console.error("No file selected for imgUrl");
        }

        // Debugging: Log FormData entries
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await fetch("http://localhost:3000/api/blog", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Blog added:", data);
                setNewBlog({
                    title: "",
                    description: "",
                    author: "",
                    imgUrl: null,
                });
                window.location.reload();
            } else {
                console.error("Error adding blog:", response.statusText);
            }
        } catch (error) {
            console.error("Error adding blog:", error);
        }
    };

    return (
        <Helmet title="Blogs">
            <CommonSection title="Blogs" />
            <section>
                <Container>
                    <Row>
                        <Col md="6">
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={newBlog.title}
                                        onChange={handleInputChange}
                                        placeholder="Enter blog title"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input
                                        type="textarea"
                                        name="description"
                                        id="description"
                                        value={newBlog.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter blog description"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="author">Author</Label>
                                    <Input
                                        type="text"
                                        name="author"
                                        id="author"
                                        value={newBlog.author}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="imgUrl">Image For Blog</Label>
                                    {/* Single File Accept Input */}
                                    <Input
                                        type="file"
                                        name="imgUrl"
                                        id="imgUrl"
                                        onChange={handleImageChange}
                                        placeholder="Enter image URL"
                                    />
                                </FormGroup>
                                {!isEditing ? (
                                    <Button onClick={handleSubmit}>
                                        Add Blog
                                    </Button>
                                ) : (
                                    <Button onClick={handleEditBlog}>
                                        Update Blog
                                    </Button>
                                )}
                            </Form>
                        </Col>
                        <Col md="6">
                            <BlogList
                                setEdit={setNewBlog}
                                setIsEditing={setIsEditing}
                                handleDeleteBlog={handleDeleteBlog}
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Blogs;
