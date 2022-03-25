interface constantsdef {
    url: { API_URL: string; FH_URL: string }
    axios: { withCredentials: boolean }
}

const prod: constantsdef = {
    url: {
        API_URL: window.location.origin + "/api",
        FH_URL: window.location.origin + "/data",
    },
    axios: { withCredentials: false },
}

const dev: constantsdef = {
    url: {
        //API_URL: "https://demo.filefighter.de/api",
        API_URL: "http://localhost:8080",
        //API_URL: "http://localhost/api",
        FH_URL: "http://localhost:5000/data",
        //FH_URL: "http://localhost/data"
        //   FH_URL: "https://demo.filefighter.de/data",
    },
    axios: { withCredentials: true },
}
export const constants = process.env.NODE_ENV === "development" ? dev : prod

export const REQUIRED_PASSWORD_STRENGTH = 3 // 3/4 (starting at 0)
export const DEFAULT_ALERT_DURATION = 3500
