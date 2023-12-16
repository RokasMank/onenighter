import axios from "axios";
import { baseUrl } from "./baseUrl";

const client = axios.create({
  baseURL: `${baseUrl()}ChatTheme`
});


export const getThemes = async () => {
  try {
    const response = await client.get(`themes`);
    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};
