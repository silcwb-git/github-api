import axios from "axios";

const apis = axios.create({
  baseURL: "https://api.github.com/users/globocom/repos",
});

export default apis;
