import axios from "axios";
import environment from "../environment/environment";
axios.defaults.baseURL = environment.baseUrl;
export default {
  // ============== General Get method
  getMethod(url, data = { params: {} }) {
    return axios.get(url, data).then(response => {
      return response.data;
    });
  },
  // ============== General Put method
  putMethod(url, data) {
    return axios.put(url, data).then(response => {
      return response.data;
    });
  },
  // ============== General Delete method
  deleteMethod(url) {
    return axios.delete(url).then(response => {
      return response.data;
    });
  },
  // ============== General Post method
  postMethod(url, data = {}) {
    return axios.post(url, data).then(response => {
      return response.data;
    });
  },
};
