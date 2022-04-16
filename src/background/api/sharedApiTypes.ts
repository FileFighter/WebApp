/**
 * Interface describing the standard return value of the backend
 * NOT IMPLEMENTED
 */
export interface ApiStatusResponse {
    // FIXME implement it if needed
    responseCode: number
    responseStatus: { statusMessage: string; message: string }
}
