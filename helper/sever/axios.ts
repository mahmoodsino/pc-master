import axios from "axios";


const root = process.env.NEXT_PUBLIC_BASE

const apiWorker = axios.create();

apiWorker.interceptors.request.use(function (config: any) {
  config.headers.branch_id = 1;
  config.headers.company = 1;
  return config;
});

apiWorker.interceptors.response.use(
  function (response) {
    if (response.data && response.data.ok == false) {
      //error
    }
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      localStorage.removeItem("email")
      localStorage.removeItem("type")
      localStorage.removeItem("id")
      localStorage.removeItem("token")
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export const getApiOptions = (path = null) => {
  return {
    root: `${root}${path}`,
    options: {
      headers: {},
    },
  };
};

export default apiWorker;
