import axios from "axios";

function getAuth() {
  return axios.get("/auth");
}

export default getAuth;
