/**
 * It scrolls to the element with the given id, and if the event is not null, it prevents the default action of the event
 * @param history - This is the history object from React Router.
 * @param {string} id - The id of the element to scroll to
 * @param [event] - The event that triggered the scroll.
 */
const scrollToElement = (
    history: { push: (path: string) => void },
    id: string,
    event?: { preventDefault: () => void }
): void => {
    //Replaces anchor for React
    console.log("Scrolled to " + id)
    event?.preventDefault()
    if (id) {
        const element = document.getElementById(id)
        element?.scrollIntoView()
    }
}

/**
 * Prevent the default event and redirect to a new path, but only if it's different from the current path.
 *
 * @param history - { push: (path: string) => void }
 * @param {string} path - The path to redirect to.
 * @param [event] - The event that triggered the redirect.
 */
const redirect = (
    history: { push: (path: string) => void },
    path: string,
    event?: { preventDefault: () => void }
): void => {
    console.log("Redirected to " + path)
    event?.preventDefault()
    if (path !== window.location.pathname) history.push(path)
}

export { redirect, scrollToElement }
