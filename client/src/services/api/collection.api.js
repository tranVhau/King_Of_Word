import axiosClient from "./axiosClient";
import axios from "axios";

const collectionAPIs = {
  getAllCollections: async (reqCookie, query) => {
    const url = "/client/api/collections";
    return await axiosClient.get(url, {
      params: query,
      headers: { Cookie: reqCookie },
    });
  },
  getCollection: async (collectionID) => {
    const url = `/client/api/collection/${collectionID}`;
    return await axiosClient.get(url);
  },

  getPriceList: async (reqCookie) => {
    const url = "/client/api/price-list";
    return await axiosClient.get(url, { headers: { Cookie: reqCookie } });
  },

  purchaseCollection: async (payload) => {
    const url = `/client/api/collection/payment`;
    return await axiosClient.post(url, payload, { withCredentials: true });
  },

  purchasePackage: async (payload) => {
    const url = `/client/api/package/payment`;
    return await axiosClient.post(url, payload, { withCredentials: true });
  },
};

export default collectionAPIs;
