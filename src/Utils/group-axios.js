import axios from "axios";
import { baseUrl } from "./baseUrl";
import { User } from "../User/User";

const groupClient = () => {
  const token = sessionStorage.getItem(User.accessToken);

  return axios.create({
    baseURL: `${baseUrl()}Group`,
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
};

export default groupClient;