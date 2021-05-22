// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('loginWithUrl', (path) => {
    const user = {username:"Admin",password:"admin"}

    cy.visit(path)
    cy.get('input[id=formBasicUsername]')
        .type(user.username)

    cy.get('input[id=formBasicPassword]')
        .type(`${user.password}{enter}`)
})

Cypress.Commands.add('logout', () => {
    const user = {username:"Admin",password:"admin"}

    cy.get("#basic-nav-dropdown").contains(user.username).click()
    cy.get(".dropdown-item").contains("Logout").click()
})

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
