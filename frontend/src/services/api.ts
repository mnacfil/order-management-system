import axios, { type AxiosInstance } from "axios";
import { API_BASE_URL } from "../lib/config";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default apiClient;
