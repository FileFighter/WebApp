
interface constants {
    url: { API_URL: string }
}


const prod: constants = {
    url: {
        API_URL: window.location.hostname,
    }
}

const dev: constants = {
    url: {
        API_URL: 'http://filefighter.ddns.net:7000/',
    }
};
export const constants = process.env.NODE_ENV === 'development' ? dev : prod;