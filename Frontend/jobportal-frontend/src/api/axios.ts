
import axios from "axios";

// Use environment variable or fallback
export const baseURL = import.meta.env.VITE_API_URL ??  "http://abayjobs.tryasp.net";
// "http://localhost:5029";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const msgApi = (window as any).msgApi; // get the global msgApi
    if (error.response) {
      const status = error.response.status;
      const dataMessage = error.response.data?.message;

      switch (status) {
        case 400:
          msgApi?.error(dataMessage || "Bad request.");
          break;
        case 401:
          msgApi?.error(dataMessage || "Unauthorized. Please login.");
          break;
        case 403:
          msgApi?.error(dataMessage || "Forbidden. You do not have access.");
          break;
        case 404:
          msgApi?.error(dataMessage || "Resource not found.");
          break;
        case 405:
          msgApi?.error("This action is not allowed. Please contact support.");
          break;  
          case 409:
          msgApi?.error("This action is not allowed. Please contact support.");
          break;
        case 500:
          msgApi?.error("Server error. Try again later.");
          break;
        default:
          msgApi?.error(dataMessage || "An unexpected error occurred.");
      }
    } else {
      msgApi?.error("Cannot connect to server. Check your network.");
    }

    return Promise.reject(error);
  }
);
