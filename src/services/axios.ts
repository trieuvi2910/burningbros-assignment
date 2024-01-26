import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";

const axiosClient = axios.create({
    baseURL: "https://dummyjson.com/",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.response.use(
    function (response: AxiosResponse) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosClient;
