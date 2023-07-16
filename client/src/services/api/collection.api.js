import axiosClient from "./axiosClient";

const collectionAPIs = {
  getAllCollections: async (cookie) => {
    const url = "/client/api/collections";
    return await axiosClient.get(url, {
      headers: {
        Cookies: 1234,
      },
    });
  },
};

export default collectionAPIs;
