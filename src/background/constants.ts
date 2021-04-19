interface constantsdef {
  url: { API_URL: string
  FH_URL: string};
}

const prod: constantsdef = {
  url: {
    API_URL: window.location.origin + "/api",
    FH_URL: window.location.origin + "/data"
  }
};

const dev: constantsdef = {
  url: {
    //API_URL: "https://demo.filefighter.de/api",
    API_URL: "http://localhost:8080",
    FH_URL: "http://localhost:5000/data"
  }
};
export const constants = process.env.NODE_ENV === "development" ? dev : prod;
