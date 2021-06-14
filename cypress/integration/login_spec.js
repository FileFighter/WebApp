/* eslint no-undef: 0 */

describe("The Home Page", () => {
    it("successfully loads", () => {
        cy.visit("/");
    });

    it("sets auth cookie when logging in via form submission", function () {
        const username = "admin";
        const password = "admin";

        cy.get("input[id=formBasicUsername]").type(username);

        // {enter} causes the form to submit
        cy.get("input[id=formBasicPassword]").type(`${password}{enter}`);

        cy.get("span.navbar-link-description")
            .contains("Health")
            .click();

        // UI should reflect this user being logged in
        cy.get("h1").should("contain", "FileFighter");

        // our auth cookie should be present
        cy.getCookie("refreshToken").should("exist");
    });
});
