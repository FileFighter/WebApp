import { useLocation, useNavigate } from "react-router-dom"

export default function BackendRedirect() {
    const location = useLocation()
    const navigate = useNavigate()
    const urlSearchParams = new URLSearchParams(location.search)
    const redirected = urlSearchParams.get("redirected")

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
