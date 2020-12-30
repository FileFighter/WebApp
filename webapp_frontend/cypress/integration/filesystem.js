import '../support/index'
import cy from "cypress"

describe('The Home Page', () => {

    beforeEach(() => {
        cy.log('Login before every test')
        cy.loginWithUrl("/file")
    })



    it('successfully loads', () => {
        cy.get(".col-3 > a").contains('dummyFile.txt').click()
        cy.url().should('include', '#dummyFile.txt')
    })




})
