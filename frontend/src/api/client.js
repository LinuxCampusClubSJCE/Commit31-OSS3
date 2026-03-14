import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_URL;
if (!rawBaseUrl) {
  throw new Error("Missing VITE_API_URL");
}

const BASE_URL = rawBaseUrl.replace(/\/+$/, "");
/**
 * Default token provider (fallback to localStorage)
 */
let tokenProvider = () => localStorage.getItem("token");

/**
 * Allow AuthContext to provide token dynamically
 */
export function setTokenProvider(provider) {
  tokenProvider =
    typeof provider === "function"
      ? provider
      : () => localStorage.getItem("token");
}

const apiClient = axios.create({
  baseURL: BASE_URL,
});

/**
 * Attach Authorization header automatically
 */
apiClient.interceptors.request.use((config) => {
  const token = tokenProvider();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * Normalize API errors
 */
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "API request failed";

    return Promise.reject(new Error(message));
  }
);

const api = {
  get(endpoint, config = {}) {
    return apiClient.get(endpoint, config);
  },

  post(endpoint, body, config = {}) {
    return apiClient.post(endpoint, body, config);
  },

  put(endpoint, body, config = {}) {
    return apiClient.put(endpoint, body, config);
  },

  patch(endpoint, body, config = {}) {
    return apiClient.patch(endpoint, body, config);
  },

  delete(endpoint, config = {}) {
    return apiClient.delete(endpoint, config);
  },
};

export default api;