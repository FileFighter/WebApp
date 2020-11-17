import { ADD_REFRESH_TOKEN,ADD_ACCESS_TOKEN} from "./actionTypes";




export const addRefreshToken = (content: number) => ({
    type: ADD_REFRESH_TOKEN,
    payload: content
});
export const addAccessToken = (content: number) => ({
    type: ADD_ACCESS_TOKEN,
    payload: content
});