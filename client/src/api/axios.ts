import axios from "axios";
import { CONFIG } from "../config-global";

const axiosInstance = axios.create({
  baseURL: `${CONFIG.site.serverUrl}`,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
