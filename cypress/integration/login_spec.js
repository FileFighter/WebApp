describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('/')
    })


    it('sets auth cookie when logging in via form submission', function () {
        // destructuring assignment of the this.currentUser object
        const  username = 'user1';
        const  password = '12345';

        //cy.visit('/login')

        cy.get('input[id=formBasicUsername]').type(username)

        // {enter} causes the form to submit
        cy.get('input[id=formBasicPassword]').type(`${password}{enter}`)

        // we should be redirected to /dashboard
        //cy.url().should('include', '/dashboard')




        // UI should reflect this user being logged in
        cy.get('h1').should('contain', 'FileFighter')

        // our auth cookie should be present
        cy.getCookie('refreshToken').should('exist')
    })

})
