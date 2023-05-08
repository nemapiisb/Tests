import {UILogin, UISignup} from "../UITags/UIdata";
let randomUser = (Math.random() + 1).toString(36).substring(7);
let randomMail = (Math.random() + 1).toString(36)+"@test.com";

context('E2E SIGNUP TESTS', () => {
    it('USER SingUp e2e test', () => {
        cy.visit('/register');
        cy.intercept('POST', '/api/auth/signup').as('interceptSignUp');

        cy.wait(2000);
        cy.get(UILogin.username).click().type(randomUser);
        cy.wait(2000);
        cy.get(UISignup.mail).click().type(randomMail);
        cy.wait(2000);
        cy.get(UILogin.pass).click().type('fakepass');
        cy.get(UISignup.signUpBtn).click();
        cy.wait(3000);
        cy.wait('@interceptSignUp').then(interception => {
            expect(interception.response.statusCode).to.equal(200);
        })
    }),
        it('NEW USER Login e2e test', () => {
            cy.visit('/login');
            cy.intercept('POST', '/api/auth/signin').as('interceptLogin');
            cy.wait(2000);
            cy.get(UILogin.username).click().type(randomUser);
            cy.wait(2000);
            cy.get(UILogin.pass).click().type('fakepass');
            cy.get(UILogin.loginBtn).click();
            cy.wait(3000);
            cy.wait('@interceptLogin').then(interception => {
                expect(interception.response.statusCode).to.equal(200);
            })
        })
})
