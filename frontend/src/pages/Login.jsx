import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const { Login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    Login(data.email, data.password)
      .then(() => {
        setError("");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Login</h1>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>

            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="email"
              className="input input-bordered"
            />

            {/* {errors.email && (
                    <span className="text-red-600">This field is required</span>
                  )} */}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>

            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="password"
              className="input input-bordered"
            />
            {errors.password && (
              <span className="text-red-600">This field is required</span>
            )}
            <p>{error}</p>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary bg-yellow-600 text-white">
              Login
            </button>
            <div className="mt-2">
              <p>
                Do not have an account?{" "}
                <Link to="/signup" className="text-orange-600">
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
