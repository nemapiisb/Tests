import {usersData, adminData} from '../dataTest/data';
import {UILogin} from "../UITags/UIdata";

context('E2E LOGIN TESTS', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('USER Login e2e test', () => {
    cy.visit('/login');
      cy.intercept('POST', '/api/auth/signin').as('interceptLogin');
      cy.wait(2000);
    cy.get(UILogin.username).click().type(usersData.username);
    cy.wait(2000);
    cy.get(UILogin.pass).click().type(usersData.userpass);
    cy.get(UILogin.loginBtn).click();
      cy.wait(3000);
      cy.wait('@interceptLogin').then(interception => {
          expect(interception.response.statusCode).to.equal(200);
      })
  }),

  it('ADMIN Login e2e test', () => {
    cy.visit('/login');
      cy.intercept('POST', '/api/auth/signin').as('interceptLogin');
      cy.wait(2000);
    cy.get(UILogin.username).click().type(adminData.adminname);
    cy.wait(2000);
    cy.get(UILogin.pass).click().type(adminData.adminpass);
    cy.get(UILogin.loginBtn).click();
      cy.wait(3000);
      cy.wait('@interceptLogin').then(interception => {
          expect(interception.response.statusCode).to.equal(200);
      })
  })
})
