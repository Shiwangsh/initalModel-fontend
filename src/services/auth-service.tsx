import axios from "axios";

const login = async (email: any, password: any) => {
  return await axios
    .post("http://localhost:9090/users/login", {
      email: email,
      password: password,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      console.log(res);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        // setError(error.response.data.message);
      } else {
        console.log("Error", error);
      }
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const getCurrentUserToken = () => {
  return JSON.parse(localStorage.getItem("token") || "");
};

const authService = {
  //   signup,
  login,
  logout,
  getCurrentUserToken,
};

export default authService;
