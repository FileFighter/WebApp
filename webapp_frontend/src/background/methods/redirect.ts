const internRedirect = (history: any, path: string, event?: { preventDefault: () => void; }): void => {
    if (event) event.preventDefault();
    if (path) {
        const element = document.getElementById(path)
        if (element) {
            element.scrollIntoView()
        }
    }
};
const externRedirect = (event: { preventDefault: () => void; }, history: any[], path: string): void => {
    event.preventDefault();
    history.push(path);
};

export {externRedirect, internRedirect}