import axios from "axios";
import { api } from "../../api/axios";
import { useAuth } from "../../app/AuthContext";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  message: string;
  
  res: {
    id: string;
    email: string;
    role: string;
  };
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post("api/Users/Auth/login", payload);
   console.log(response.data);
  return response.data;
};


interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
 
  message: string;
}


export const register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const response = await api.post("api/Users/Auth/register", payload);
  return response.data;
};


export const logout = async () => {
  // const {setUser} =useAuth()

  try {
    await axios.post("/logout", {}, { withCredentials: true }); // call backend
  } catch (err) {
    console.error("Logout failed", err);
  } finally {
    // setUser(null); // clear local storage + context
  }
};
