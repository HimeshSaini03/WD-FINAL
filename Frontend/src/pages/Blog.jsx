// import React from "react";
// import { Container, Row } from "reactstrap";
// import Helmet from "../components/Helmet/Helmet";
// import CommonSection from "../components/UI/CommonSection";
// import BlogList from "../components/UI/BlogList";

// const Blog = () => {
//   return (
//     <Helmet title="Blogs">
//       <CommonSection title="Blogs" />
//       <section>
//         <Container>
//           <Row>
//             <BlogList />
//             <BlogList />
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// export default Blog;

import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import BlogList from "../components/UI/BlogList";

const Blogs = () => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    description: "",
    author: "",
    time: "",
    imgUrl: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Blog added:", data);
        setNewBlog({ title: "", description: "", author: "", time: "", imgUrl: "" });
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
                  <Label for="time">Time</Label>
                  <Input
                    type="text"
                    name="time"
                    id="time"
                    value={newBlog.time}
                    onChange={handleInputChange}
                    placeholder="Enter time"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="imgUrl">Image URL</Label>
                  <Input
                    type="text"
                    name="imgUrl"
                    id="imgUrl"
                    value={newBlog.imgUrl}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                  />
                </FormGroup>
                <Button type="submit">Add Blog</Button>
              </Form>
            </Col>
            <Col md="6">
              <BlogList />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Blogs;
