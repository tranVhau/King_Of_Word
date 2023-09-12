import axios from "axios";
import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const socketURL =
  serverRuntimeConfig.socketURL || publicRuntimeConfig.socketURL;

console.log("server: ", serverRuntimeConfig.socketURL);
console.log("public: ", publicRuntimeConfig.socketURL);
console.log("MY ENV >>>", socketURL);

const axiosClient = axios.create({
  baseURL: socketURL,
  timeout: 10000,
  withCredentials: true,
});
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
