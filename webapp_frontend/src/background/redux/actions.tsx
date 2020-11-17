import { ADD_REFRESH_TOKEN,ADD_ACCESS_TOKEN} from "./actionTypes";


interface refreshToken{
    refreshToken:number;
}

export const addRefreshToken = (content: number) => ({
    type: ADD_REFRESH_TOKEN,
    payload: {
        refreshToken: content
    }
});
export const addAccessToken = (content: number) => ({
    type: ADD_ACCESS_TOKEN,
    payload: {
        accessToken: content
    }
});