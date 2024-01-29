import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
      });
  }, [id]);

  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newBlog = {
      title: data.title,
      body: data.body,
    };

    fetch(`http://localhost:5000/blogs/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBlog),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Edit Blog</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title*</span>
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              defaultValue={blog.title}
              placeholder="title"
              className="input input-bordered"
            />
            {errors.name && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Body*</span>
            </label>
            <textarea
              {...register("body", { required: true })}
              placeholder="body"
              defaultValue={blog.body}
              className="input input-bordered"
            />
            {errors.email && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          {/* <p className="text-red-600">{error}</p> */}

          <div className="form-control mt-6">
            <button className="btn btn-primary bg-yellow-600 text-white">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
