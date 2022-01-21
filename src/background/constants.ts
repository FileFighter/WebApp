interface constantsdef {
    url: { API_URL: string; FH_URL: string };
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
        //API_URL: "http://localhost:8080",
        //API_URL: "http://localhost/api",
        //FH_URL: "http://localhost:5000/data"
        //FH_URL: "http://localhost/data"
        FH_URL: "https://demo.filefighter.de/data"
    }
};
export const constants = process.env.NODE_ENV === "development" ? dev : prod;

export const REQUIRED_PASSWORD_STRENGTH = 3;
export const DEFAULT_ALERT_DURATION = 3500;
