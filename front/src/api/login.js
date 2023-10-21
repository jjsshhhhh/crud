import axios from "axios";

function login(userId, userPassword) {
  return axios.post("/auth/login", {
    userId,
    userPassword,
  });
}

export default login;
