import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="ml-6">
      <h1 className="text-3xl my-3 font-bold text-center">All Blogs</h1>
      {loading ? (
        <p>Loading.....</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li
              className="border border-gray-400 shadow-lg rounded mb-2 p-3"
              key={blog._id}
            >
              <Link to={`blogs/${blog._id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Blogs;
