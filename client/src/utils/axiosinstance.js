import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance =  axios.create({
    baseURL : BASE_URL,
    timeout : 80000,
    headers : {
        "Content-Type" : "application/json",
        Accept : "application/json"
    }
});


axiosInstance.interceptors.request.use((config)=> {
    const accessToken = localStorage.getItem("token");
    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
    },(error)=> {
        return Promise.reject(error)
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // handle common error globally
        if (error.response) {
            if (error.response.status === 401) {
                // If token exists but expired, clear storage
                if (localStorage.getItem("token")) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    // Only redirect if not already on public pages
                    if (window.location.pathname !== "/" && window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
                        window.location.href = "/login";
                    }
                }
            } else if (error.response.status === 500) {
                console.error("Server Error, Please try again later");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout, Please try again");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;