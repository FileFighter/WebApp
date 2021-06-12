const scrollToElement = (
    history: { push: (path: string) => void },
    id: string,
    event?: { preventDefault: () => void }
): void => {
    //Replaces anchor for React
    console.log("Scrolled to " + id);
    event?.preventDefault();
    if (id) {
        const element = document.getElementById(id);
        element?.scrollIntoView();
    }
};
const redirect = (
    history: { push: (path: string) => void },
    path: string,
    event?: { preventDefault: () => void }
): void => {
    console.log("Redirected to " + path);
    event?.preventDefault();
    if (path !== window.location.pathname) history.push(path);
};

export { redirect, scrollToElement };
