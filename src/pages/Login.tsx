import * as React from "react";
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await axios
      .post("http://localhost:9090/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage["name"] = res.data.data.user.name;
        localStorage["email"] = res.data.data.user.email;
        navigate("/dashboard/home");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <h3 className="text-center">E-Ticketing</h3>
                <img
                  src={logo}
                  alt="avatar"
                  className="rounded mx-auto d-block"
                  style={{ width: "150px" }}
                />
                <form action="#" className="login-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control rounded-left"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group d-flex">
                    <input
                      type="password"
                      className="form-control rounded-left"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group d-md-flex">
                    <div className="w-50 text-md-right">
                      <a href="#">Forgot Password</a>
                    </div>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary rounded submit p-3 px-5"
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
