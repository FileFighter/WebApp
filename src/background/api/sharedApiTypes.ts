/**
 * Interface describing the standard return value of the backend
 * NOT IMPLEMENTED
 * @interface
 * @param {number} responseCode
 * @param {{statusMessage: string; message: string}} responseStatus
 */
export interface ApiStatusResponse {
    // FIXME implement it if needed
    responseCode: number
    responseStatus: { statusMessage: string; message: string }
}
