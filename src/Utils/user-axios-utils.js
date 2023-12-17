import axios from "axios";
import { baseUrl } from "./baseUrl";

const client = axios.create({
  baseURL: `${baseUrl()}User`
});

export const loginUser = async (body) => {
  try {
    const response = await client.post(`login`, { ...body });
    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

export const registerUser = async (body) => {
  try {
    const response = await client.post(``, { ...body });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const getUsers = async () => {
  try {
    const response = await client.get(`users`);
    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};
