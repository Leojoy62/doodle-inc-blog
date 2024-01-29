import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [fBlogs, setFblogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((res) => res.json())
      .then((data) => {
        setFblogs(data.filter((blog) => blog.isFavorite === true));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="ml-6">
      <h1 className="text-3xl font-bold my-3 text-center">Favorite Blogs</h1>
      {loading ? (
        <p>Loading.....</p>
      ) : (
        <ul>
          {fBlogs.map((fblog) => (
            <li
              className="border border-gray-400 shadow-lg rounded mb-2 p-3 text-blue-600"
              key={fblog._id}
            >
              <Link to={`/blogs/${fblog._id}`}>{fblog.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
