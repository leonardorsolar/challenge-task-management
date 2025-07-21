import axios from "axios";

const apiIA = axios.create({
  baseURL: "http://localhost:4000/api/v1", // novo servidor para o ia
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiIA;
