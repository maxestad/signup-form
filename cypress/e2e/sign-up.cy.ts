describe('Sign up form', () => {
  it('Should visit the initial page and redirect to /sign-up', () => {
    cy.visit('/');
    cy.url().should('include', '/sign-up');
    cy.contains('Sign Up');
  });

  it('Should fill sign up form with incorrect values', () => {
    cy.visit('/');
    cy.get('[name="firstName"]').should('be.visible').type('John');
    cy.get('[name="lastName"]').should('be.visible').type('Doe');
    cy.get('[name="email"]').should('be.visible').type('example@email.com');
    cy.get('[name="password"]').should('be.visible').type('password');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Should submit the form correctly and redirect to /dashboard', () => {
    cy.visit('/');
    cy.get('[name="firstName"]').should('be.visible').type('John');
    cy.get('[name="lastName"]').should('be.visible').type('Doe');
    cy.get('[name="email"]').should('be.visible').type('example@email.com');
    cy.get('[name="password"]').should('be.visible').type('Password1234');
    cy.get('button[type="submit"]').should('be.visible').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome aboard 👏');
  });
});
