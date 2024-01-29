import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const CreateBlog = () => {
  const navigate = useNavigate();

  const { uid } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const uniqueId = Date.now();
    const newBlog = {
      userId: uid,
      id: uniqueId,
      title: data.title,
      body: data.body,
      isFavorite: false,
    };
    console.log(newBlog);
    fetch("http://localhost:5000/blogs", {
      method: "POST",
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
          <h1 className="text-3xl font-bold text-center">Create A Blog</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title*</span>
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
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
              className="input input-bordered"
            />
            {errors.email && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          {/* <p className="text-red-600">{error}</p> */}

          <div className="form-control mt-6">
            <button className="btn btn-primary bg-yellow-600 text-white">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
