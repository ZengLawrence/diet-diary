describe('The Home Page', () => {

  const aValidDate = /^\d{1,2}[-\/]\d{1,2}[-\/]\d{4}$/;

  it('successfully loads', () => {
    cy.visit('/');

    cy.get('#date').contains(aValidDate);
  })
})