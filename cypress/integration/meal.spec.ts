context('Meal operations', () => {
  beforeEach(() => {
    // clear app state
    cy.clearLocalStorage();
    cy.visit('/');
  })

  it('add a new meal', () => {
    cy.get('#buttonAddMeal').click();

    cy.get('#mealCards')
      .last()
      .should('contain', "Delete")
      .should('contain', 'Edit')
      .get('#formAdd').should('exist');

  })
})