/* eslint no-undef: 0 */

import "../support/index";

describe("The filesystem page", () => {
    beforeEach(() => {
        cy.log("Login before every test");
    });

    it("changes the url when you click on a file", () => {
        cy.loginWithUrl("/file");
        cy.get("div.col-md-4.col-6 a").contains("Admin").click();
        cy.url().should("include", "/admin");
    });

    it("goes back to the home of the filesystem", () => {
        cy.loginWithUrl("/file/admin");
        cy.get("div").contains("Main").click();
        cy.url().should("not.include", "/admin");
    });

    it("shows error message when a path does not exist", () => {
        cy.loginWithUrl("/file/fghdhjghjdfhjhdfkhg/dfghjkhghjdfhj");
        cy.get("div").contains(
            "Folder does not exist, or you are not allowed to see the folder."
        );
    });

    it("finds a folder and enters it", () => {
        cy.loginWithUrl("/file");
        cy.get("button.btn.btn-outline-secondary.btn-sm")
            .contains("Search")
            .click();
        cy.get("input[id=searchValue]").type("admin");
        cy.get("div.text-truncate.col-6 a").click();
    });
});
