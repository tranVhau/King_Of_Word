import axiosClient from "./axiosClient";
const userAPIs = {
  me: async (reqCookie) => {
    const url = "/auth/me";
    return await axiosClient.get(url, { headers: { Cookie: reqCookie } });
  },
  logout: async () => {
    const url = "http://localhost:8000/auth/logout";
    const response = await axiosClient.post(url, null, {
      withCredentials: true,
    });
    return response.data;
  },
};
export default userAPIs;
