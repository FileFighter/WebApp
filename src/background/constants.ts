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
    API_URL: "https://demo.filefighter.de/api",
   // API_URL: "http://localhost:8080",
    //API_URL: "http://localhost/api",
    //FH_URL: "http://localhost:5000/data"
    FH_URL: "http://localhost/data"

  }
};
export const constants = process.env.NODE_ENV === "development" ? dev : prod;


export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 20;
export const DEFAULT_ALERT_DURATION = 3500;
