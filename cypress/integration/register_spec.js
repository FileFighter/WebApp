import '../support/index'

const password="tghisZHdgaszugi342"

describe('The register Page', () => {

    beforeEach(() => {
        cy.log('Login before every test')
        cy.loginWithUrl("")
    })



    it('registers a user successfully', () => {



        cy.get("#ff-heath-table > tbody > tr:nth-child(4) > td:nth-child(2)").contains(/^\d+/).then(($tr)=>
        {
            const currentUserCount = $tr.text()




        cy.log(`current Count of users: ${currentUserCount}`)
        console.log(currentUserCount)

        cy.get("span.navbar-link-description").contains("Registration").click()


        const username = Math.floor(Math.random() * Math.floor(1000000)).toString()
        cy.get("#registrationContainer #formBasicUsername").type(username)
        cy.get("#formBasicPassword").type(password)
        cy.get("#formConfirmPassword").type(password)

        cy.get(".btn.btn-primary").contains("Submit").click()
        cy.get("span.navbar-link-description").contains("Main").click()

        cy.logout()

        cy.get('input[id=formBasicUsername]').type(username)

        cy.get('input[id=formBasicPassword]').type(`${password}{enter}`)


        cy.get('h1').should('contain', 'FileFighter')


            let newUserCount = (parseInt(currentUserCount)+1).toString();
            cy.log(newUserCount);

            cy.get("#ff-heath-table > tbody > tr:nth-child(4) > td:nth-child(2)").contains(/^\d+/).should('contain',newUserCount)
        })
    })




})
