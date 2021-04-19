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
    API_URL: "https://demo.filefighter.de/api"
    // API_URL: 'http://localhost:8081/https://filefighter.de/api',
    //  API_URL: 'http://localhost:8080',
    //API_URL: 'https://filefighter.de/api',
  }
};
export const constants = process.env.NODE_ENV === "development" ? dev : prod;


export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 20;
export const DEFAULT_ALERT_DURATION = 3500;
