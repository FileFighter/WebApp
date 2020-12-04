interface constants {
    url: { API_URL: string }
}


const prod: constants = {
    url: {
        API_URL: window.location.origin,
    }
}

const dev: constants = {
    url: {
       API_URL: 'http://filefighter.ddns.net:1081/http://filefighter.ddns.net:3001',
       // API_URL: 'http://localhost:8080',
    }
};
export const constants = process.env.NODE_ENV === 'development' ? dev : prod;
