import { useLocation, useNavigate } from "react-router-dom"
import { constants } from "../../background/constants"

export default function BackendRedirect() {
    const location = useLocation()
    const navigate = useNavigate()
    const urlSearchParams = new URLSearchParams(location.search)
    const redirected = urlSearchParams.get("redirected")

    console.log("Redirecting to filehandler ")
    if (constants.url.FH_URL !== window.location.origin + "/data") {
        console.log("Redirecting to filehandler ", location)

        window.location.href =
            constants.url.FH_URL + location.pathname.replace("/data", "")
    }

    // this param will be visible for the user, even though it is only needed if the fe is not accessed via nginx, but it prevents endless loops
    if (redirected === "") {
        navigate("/error404")
        return null
    }
    urlSearchParams.set("redirected", "")
    navigate(location.pathname + "?" + urlSearchParams.toString())
    window.location.reload() // leave the spa, to access the apis.
    return null
}
