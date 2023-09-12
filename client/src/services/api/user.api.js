import axiosClient from "./axiosClient";
const userAPIs = {
  me: async (reqCookie) => {
    const url = "/auth/me";
    return await axiosClient.get(url, { headers: { Cookie: reqCookie } });
  },
  logout: async () => {
    const url = "/auth/logout";
    const response = await axiosClient.get(url, {
      withCredentials: true,
    });
    return response.data;
  },
};
export default userAPIs;
