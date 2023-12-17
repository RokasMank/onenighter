import axios from "axios";
import { baseUrl } from "./baseUrl";
import { User } from "../User/User";

const token = sessionStorage.getItem(User.accessToken)
console.log(token)
const client = axios.create({
  baseURL: `${baseUrl()}Message`,
  headers: {
    "Authorization": `Bearer ${token}`
  }
});

export const sendMessage = async (group) => {
    try {
     
      const response = await client.post(``, { ...group });
  
      // Assuming your API responds with the created group data
      const data = response.data;
  
      return data;
    } catch (error) {
      console.error("Error creating group:", error);
  
      throw new Error(`Error creating group: ${error.message}`);
    }
  };
