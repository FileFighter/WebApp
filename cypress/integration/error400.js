/* eslint no-undef: 0 */

const message = "the weird backend message";
const dest = "/data/preview/4325/pdf.pdf";

describe("The error 400 page", () => {
    it("goes to login if not logged in and then to correct dest", () => {
        cy.visit(
            "/error?message=" +
                encodeURIComponent(message) +
                "&dest=" +
                encodeURIComponent(dest)
        );

        cy.get("h4").contains(message);

        cy.get("a").contains("Try again").click();

        cy.loginNow();

        cy.url().should("include", dest);
    });

    it("goes to correct dest if logged in", () => {
        cy.loginWithUrl("/");

        cy.get("div.col-md-4.col-6 a").contains("Admin");

        cy.visit(
            "/error?message=" +
                encodeURIComponent(message) +
                "&dest=" +
                encodeURIComponent(dest)
        );

        cy.get("h4").contains(message);

        cy.get("a").contains("Try again").click();
        cy.url().should("include", dest);
    });
});
