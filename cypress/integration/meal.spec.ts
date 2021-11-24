context('Meal operations', () => {
  beforeEach(() => {
    cy.visit('/');

    // clear app state
    cy.clearLocalStorage();
  })

  describe('New meal', () => {

    it('successfully add a new meal', () => {
      cy.get('#buttonAddMeal').click();

      const newMealCard = cy.get('#mealCards')
        .last();

      newMealCard
        .should('contain', "Delete")
        .should('contain', 'Edit');

      const inputForm = newMealCard.get('form');
      inputForm
        .get('#inputFoodDescription').should('be.empty')
        // serving inputs
        .get('#inputServingVegetable').should('be.empty')
        .get('#inputServingFruit').should('be.empty')
        .get('#inputServingCarbohydrate').should('be.empty')
        .get('#inputServingProteinDiary').should('be.empty')
        .get('#inputServingFat').should('be.empty')
        .get('#inputServingSweet').should('be.empty')
        // buttons
        .root()
        .should('contain', "Add")
        .should('contain', "Cancel");

    })
  })
})