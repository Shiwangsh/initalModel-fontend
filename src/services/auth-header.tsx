export default function authHeader() {
  const token = localStorage.getItem("token");

  if (token) {
    // console.log(token);
    return { Authorization: "Bearer " + token };
    // return { "x-auth-token": user.accessToken };
  } else {
    return {};
  }
}
