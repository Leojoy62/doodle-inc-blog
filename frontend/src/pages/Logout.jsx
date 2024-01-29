import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { LogOut } = useContext(AuthContext);
  const navigate = useNavigate();

  LogOut()
    .then(() => {
      navigate("/login");
    })
    .catch(() => {});
  return <div></div>;
};

export default Logout;
