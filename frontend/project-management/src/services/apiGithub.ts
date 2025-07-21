import axios from "axios";

const apiGithub = axios.create({
  baseURL: "http://localhost:4500", // novo servidor para o GitHub
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiGithub;
