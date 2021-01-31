interface constantsdef {
  url: { API_URL: string };
}

const prod: constantsdef = {
  url: {
    API_URL: window.location.origin + "/api"
  }
};

const dev: constantsdef = {
  url: {
    API_URL: "https://filefighter.de/api"
    // API_URL: 'http://localhost:8081/https://filefighter.de/api',
    //  API_URL: 'http://localhost:8080',
    //API_URL: 'https://filefighter.de/api',
  }
};
export const constants = process.env.NODE_ENV === "development" ? dev : prod;
