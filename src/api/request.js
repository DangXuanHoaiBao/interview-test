import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' }
})

const err = error => {
  if (!error.response) {
    return Promise.reject(new Error("Network error"));
  } else {
    // const data = error.response.data;
    if (error.response.status === 403) {
      // notify data.message
    }

    if (error.response.status === 401) {
      // notify "Authorization verification failed"
    }
    return Promise.reject(error.response.data.error);
  }
};

service.interceptors.request.use((config) => {
  // handle others
  return config
}, err)

service.interceptors.response.use((res) => {
  if (res.status === 204) {
    return {};
  }
  const { data } = res;
  if (data.status === "success") {
    return data.data;
  }

  if (data.status === "error") {
    throw data.error;
  }

  // notify "Server error, please try again later."
  throw new Error("Server error");
}, err)

export default service;