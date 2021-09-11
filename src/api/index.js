import service from "./request";

class InterviewApi {
  constructor() {
    (this.user = {
      checkExists: async ({ username, email }) => {
        return this.call("/user/check", {
          method: "post",
          body: { username, email }
        })
      },
      register: async ({ username, email, password }) => {
        return this.call("/register", {
          method: "post",
          body: { username, email, password }
        })
      }
    })
  }

  async call(url, { method, routeParams = {}, urlParams = {}, body = {} }) {
    Object.keys(routeParams).forEach(key => {
      url = url.replace(new RegExp(":" + key + "(/|$)", "g"), routeParams[key] + "$1");
    });

    return service.request({
      method,
      params: urlParams,
      url: `${url}`,
      data: body ? JSON.stringify(body) : undefined
    });
  }
}

const api = new InterviewApi();

export default api;

