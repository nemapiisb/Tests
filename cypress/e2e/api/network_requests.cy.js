context('FUNCTIONAL API TESTS', () => {
  let apiBaseUrl = Cypress.config().baseUrl;
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('API Tests functional for anuncios requests', () => {
    cy.request('GET', apiBaseUrl+'anuncios')
      .then(res => {
        res.body.forEach(elem => {
          expect(res.status).to.eq(200)
          expect(res).to.be.an('object');
          // cy.log(elem.id)
          expect(elem).to.have.property('id')
          expect(elem).to.have.property('contenido')
          expect(elem).to.have.property('categoria')
          expect(elem).to.have.property('fecha')
        })
      })
  })

  it('API Login tests > ADMIN', () => {
  cy.request({
    method: 'POST',
    url: apiBaseUrl+'api/auth/signin',
    body: {
      password: 'adminadmin',
      username: 'admin'
    },
  }).then((response) => {
      expect(response).property('status').to.equal(200)
      expect(response).property('body').to.have.property('id')
      expect(response).property('body').to.have.property('username').to.eq('admin')
      expect(response).property('body').to.have.property('email').to.eq('admin@admin.com')
      expect(response).property('body').to.have.property('roles').to.have.length(3)
      expect(response).property('body').to.have.property('accessToken').not.to.be.empty
      expect(response).property('body').to.have.property('tokenType').to.contain('Bearer')
    })
  }),

  it('API Login tests > VECINO', () => {
  cy.request({
    method: 'POST',
    url: apiBaseUrl+'api/auth/signin',
    body: {
      password: 'newuser',
      username: 'newuser'
    },
  }).then((response) => {
      expect(response).property('status').to.equal(200)
      expect(response).property('body').to.have.property('id')
      expect(response).property('body').to.have.property('username').to.eq('newuser')
      expect(response).property('body').to.have.property('email').to.eq('newuser@newuser.com')
      expect(response).property('body').to.have.property('roles').to.have.length(1)
      expect(response).property('body').to.have.property('accessToken').not.to.be.empty
      expect(response).property('body').to.have.property('tokenType').to.contain('Bearer')
    })
  }),

it('API Sign In tests > VECINO', () => {
    let randomUser = (Math.random() + 1).toString(36).substring(7);
    let randomMail = (Math.random() + 1).toString(36)+"@test.com";
    cy.log("random username > "+randomUser);
    cy.log("random mail > "+randomMail);
  cy.request({
    method: 'POST',
    url: apiBaseUrl+'api/auth/signup',
    body: {
      email: randomMail,
      password: "testPass",
      username: randomUser
    },
  }).then((response) => {
      expect(response).property('status').to.equal(200)
      expect(response.body.message).to.equal('User registered successfully!')
      expect(response).property('body').to.have.property('message')
    })

    cy.log("------ Test de login con el usuario registrado "+randomUser+" ------");

    cy.request({
        method: 'POST',
        url: apiBaseUrl+'api/auth/signin',
        body: {
            password: "testPass",
            username: randomUser
        },
    }).then((response) => {
        expect(response).property('status').to.equal(200)
        expect(response).property('body').to.have.property('id')
        expect(response).property('body').to.have.property('username').to.eq(randomUser)
        expect(response).property('body').to.have.property('email').to.eq(randomMail)
        expect(response).property('body').to.have.property('roles').to.have.length(1).to.have.valueOf('ROLE_VECINO')
        expect(response).property('body').to.have.property('accessToken').not.to.be.empty
        expect(response).property('body').to.have.property('tokenType').to.contain('Bearer')
    })
  })
})
