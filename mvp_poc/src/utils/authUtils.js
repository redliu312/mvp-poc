import { message } from "antd";
import axios from "axios";

// Get access token from localStorage
export const getAccessToken = () => localStorage.getItem("access_token");

// Refresh the token when access token expires
export const refreshToken = async () => {
  try {
    const refreshToken = document.cookie
      .split("; ")
      .find(row => row.startsWith("refresh_token="))
      ?.split("=")[1];

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await axios.post("http://localhost:8000/api/token/refresh/", {
      refresh: refreshToken,
    });

    // Store the new access token
    localStorage.setItem("access_token", response.data.access);
    return response.data.access;
  } catch (error) {
    message.error("Session expired, please log in again.");
    handleLogout();
  }
};

// Logout function
export const handleLogout = (setIsAuthenticated, navigate) => {
  localStorage.removeItem("access_token");
  document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  delete axios.defaults.headers.common["Authorization"];
  setIsAuthenticated(false);
  navigate("/login");
};

// Function to make an authenticated API request with auto-refresh
export const fetchWithAuth = async (url, setData, setLoading) => {
  setLoading(true);
  try {
    let accessToken = getAccessToken();
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setData(response.data.results);
  } catch (error) {
    if (error.response?.status === 401) {
      // Try refreshing the token if unauthorized
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });
        setData(response.data.results);
      }
    } else {
      message.error("Failed to fetch data");
    }
  } finally {
    setLoading(false);
  }
};