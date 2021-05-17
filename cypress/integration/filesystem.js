import "../support/index";

describe("The filesystem page", () => {
  beforeEach(() => {
    cy.log("Login before every test");

  });

  it("changes the url when you click on a file", () => {
    cy.loginWithUrl("/file");
    cy.get("div.col-md-4.col-7").contains("Admin").click();
    cy.url().should("include", "/admin");
  });

  it("goes back to the home of the filesystem", () => {
    cy.loginWithUrl("/file/admin");
    cy.get("div").contains("Home").click();
    cy.url().should("not.include", "/admin");
  });

  it("shows error message when a path does not exist", () => {
    cy.loginWithUrl("/file/fghdhjghjdfhjhdfkhg/dfghjkhghjdfhj");
    cy.get("div").contains("Folder does not exist, or you are not allowed to see the folder.")
  });
});


