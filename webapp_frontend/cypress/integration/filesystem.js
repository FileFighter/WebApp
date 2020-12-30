import '../support/index'

describe('The filesystem page', () => {

    beforeEach(() => {
        cy.log('Login before every test')
        cy.loginWithUrl("/file")
    })



    it('changes the url when you click on a file', () => {
        cy.get(".col-3 > a").contains('dummyFile.txt').click()
        cy.url().should('include', '#dummyFile.txt')
    })




})
