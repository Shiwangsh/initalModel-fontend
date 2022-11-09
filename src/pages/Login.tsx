import * as React from "react";
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png";
import ErrorModal from "../components/ErrorModal";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>();
  let navigate = useNavigate();

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    await axios
      .post("http://localhost:9090/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        navigate("/dashboard/home");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.message);
          setError(error.response.data.message);
        }
      });
  };

  return (
    <>
      {error ? (
        <ErrorModal text={error} closePopup={() => setError(false)} />
      ) : null}
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <h3 className="text-center text-info">
                  Smart Ticketing System
                </h3>
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
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-info rounded submit p-3 px-5"
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
