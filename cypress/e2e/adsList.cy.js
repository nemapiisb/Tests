import {usersData, adminData} from '../dataTest/data';
import {UIAdsList, UILogin} from "../UITags/UIdata";

context('E2E ADS LISTS TESTS', () => {
  beforeEach(() => {
    cy.visit('/')
  })


  it('ADS LIST e2e tests', () => {
    cy.visit('/login');
      cy.intercept('POST', '/api/auth/signin').as('interceptLogin');
      cy.intercept('POST', '/anuncios').as('interceptSaveAd');
    cy.get(UILogin.username).click().type(adminData.adminname);
    cy.wait(2000);
    cy.get(UILogin.pass).click().type(adminData.adminpass);
    cy.get(UILogin.loginBtn).click();
      cy.wait(3000);
      cy.wait('@interceptLogin').then(interception => {
          expect(interception.response.statusCode).to.equal(200);
      });
    cy.visit('/anunciosVecinales');
    cy.get(UIAdsList.id).should('be.visible');
    cy.get(UIAdsList.content).should('be.visible');
    cy.get(UIAdsList.date).should('be.visible');
    cy.get(UIAdsList.category).should('be.visible');
    cy.get(UIAdsList.id).should('be.visible');
    cy.wait(3000);
    cy.get(UIAdsList.addBtn).click();
    cy.get(UIAdsList.content).click().type('automated tests ad');
    cy.wait(2000);
    cy.get(UIAdsList.date).click().type('04/05/2023 20:00:00');
    cy.get(UIAdsList.saveBtn).click();
    cy.wait('@interceptSaveAd').then(interception => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.visit('/anunciosVecinales');
    cy.log(" DELETING AD ADDED .....");
    cy.get(UIAdsList.deleteBtn).last().click();
    cy.wait(3000);

  })
})
