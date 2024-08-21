import axios from "axios";

const headers = {
  ContentType: "multipart/form-data",
  Accept: "application/json",
};

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "admin/",
  headers,
});

export default Axios;
