interface constantsdef {
    url: { API_URL: string }
}


const prod: constantsdef = {
    url: {
        API_URL: window.location.origin,
    }
}

const dev: constantsdef = {
    url: {
        //API_URL: 'https://cors.filefighter.de/http://filefighter.de/api',
       // API_URL: 'https://cors-anywhere.herokuapp.com/http://filefighter.ddns.net:3001/api',
        API_URL: 'http://localhost:8080',
    }
};
export const constants = process.env.NODE_ENV === 'development' ? dev : prod;
