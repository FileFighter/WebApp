/* eslint no-undef: 0 */

import "../support/index";

describe("The Home Page", () => {
    it("successfully loads", () => {
        cy.visit("/");
    });

    it("sets auth cookie when logging in via form submission", function () {
        cy.loginNow();

        cy.get("span.navbar-link-description").contains("Health").click();

        // UI should reflect this user being logged in
        cy.get("h1").should("contain", "FileFighter");

        // our auth cookie should be present
        cy.getCookie("refreshToken").should("exist");
    });
});
