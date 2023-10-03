import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

export const registerAPICall = (user) => axios.post(BASE_URL + "/register", user);

export const loginAPICall = (user) => axios.post(BASE_URL + "/login", user);

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (username, role) => {
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", role);
};

export const isUserLoggedIn = () => {
    const username = sessionStorage.getItem("authenticatedUser");

    if (username == null) {
        return false;
    } else {
        return true;
    };
};

export const getLoggedInUser = () => {
    return sessionStorage.getItem("authenticatedUser");
};

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
};

export const isAdminUser = () => {
    let role = sessionStorage.getItem("role");

    if (role != null && role == "ROLE_ADMIN") {
        return true;
    } else {
        return false;
    }
};