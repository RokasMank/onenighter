import axios from "axios";
import { baseUrl } from "./baseUrl";
import { User } from "../User/User";

const token = sessionStorage.getItem(User.accessToken)
console.log(token)

const client = axios.create({
  baseURL: `${baseUrl()}Group`,
  headers: {
    "Authorization": `Bearer ${token}`
  }
});

export const createGroup = async (group) => {
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

  export const getUserGroups = async (userId) => {
    try {
     
      const response = await client.get(`${userId}`);
  
      // Assuming your API responds with the created group data
      const data = response.data;
  
      return data;
    } catch (error) {
      console.error("Error getting groups:", error);
  
      throw new Error(`Error getting groups: ${error.message}`);
    }
  };

  
  export const getMessages = async (id) => {
    try {
     
      const response = await client.get(`messages/${id}`);
  
      // Assuming your API responds with the created group data
      const data = response.data;
  
      return data;
    } catch (error) {
      console.error("Error creating group:", error);
  
      throw new Error(`Error creating group: ${error.message}`);
    }
  };
