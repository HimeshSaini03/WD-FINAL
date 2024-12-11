// import React from "react";
// import { Col } from "reactstrap";
// import "../../styles/blog-item.css";
// import { Link } from "react-router-dom";
// import blogData from "../../assets/data/blogData";

// const BlogList = () => {
//   return (
//     <>
//       {blogData.map((item) => (
//         <BlogItem item={item} key={item.id} />
//       ))}
//     </>
//   );
// };

// const BlogItem = ({ item }) => {
//   const { imgUrl, title, author, date, description, time } = item;

//   return (
//     <Col lg="4" md="6" sm="6" className="mb-5">
//       <div className="blog__item">
//         <img src={imgUrl} alt="" className="w-100" />
//         <div className="blog__info p-3">
//           <Link to={`/blogs/${title}`} className="blog__title">
//             {title}
//           </Link>
//           <p className="section__description mt-3">
//             {description.length > 100
//               ? description.substr(0, 100)
//               : description}
//           </p>

//           <Link to={`/blogs/${title}`} className="read__more">
//             Read More
//           </Link>

//           <div className="blog__time pt-3 mt-3 d-flex align-items-center justify-content-between">
//             <span className="blog__author">
//               <i className="ri-user-line"></i> {author}
//             </span>

//             <div className=" d-flex align-items-center gap-3">
//               <span className=" d-flex align-items-center gap-1 section__description">
//                 <i className="ri-calendar-line"></i> {date}
//               </span>

//               <span className=" d-flex align-items-center gap-1 section__description">
//                 <i className="ri-time-line"></i> {time}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Col>
//   );
// };

// export default BlogList;


import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/blog-item.css";

// BlogList component to display the fetched blogs from backend
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from the backend
  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/blog");
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        console.error("Error fetching blogs:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      {blogs.map((item) => (
        <BlogItem item={item} key={item._id} />
      ))}
    </>
  );
};

const BlogItem = ({ item }) => {
  const { imgUrl, title, author, date, description, time } = item;

  return (
    <Col lg="4" md="6" sm="6" className="mb-5">
      <div className="blog__item">
        <img src={imgUrl} alt="" className="w-100" />
        <div className="blog__info p-3">
          <Link to={`/blogs/${title}`} className="blog__title">
            {title}
          </Link>
          <p className="section__description mt-3">
            {description.length > 100 ? description.substr(0, 100) : description}
          </p>

          <Link to={`/blogs/${title}`} className="read__more">
            Read More
          </Link>

          <div className="blog__time pt-3 mt-3 d-flex align-items-center justify-content-between">
            <span className="blog__author">
              <i className="ri-user-line"></i> {author}
            </span>

            <div className="d-flex align-items-center gap-3">
              <span className="d-flex align-items-center gap-1 section__description">
                <i className="ri-calendar-line"></i> {new Date(date).toLocaleDateString()}
              </span>

              <span className="d-flex align-items-center gap-1 section__description">
                <i className="ri-time-line"></i> {time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default BlogList;
