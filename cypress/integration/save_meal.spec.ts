context("Save meal", () => {
  beforeEach(() => {
    // clear app state
    cy.clearLocalStorage();
    cy.visit("/");
  })

  const sizes = ['iphone-8', [800, 600]]

  sizes.forEach((size) => {
    describe(`Screen ${size}`, () => {
      beforeEach(() => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size as Cypress.ViewportPreset);
        }  
      });

      it("given save a meal, then add saved meal, should see same meal added", () => {
        const given = () => {
          firstMealCard()
            .within(() => {
              addFood("food 1");
              exitAddMealState();
              saveMeal();
            });
          closeSavedMealsOffcanvas();

        }

        const then = () => {
          cy.get("[data-cy=buttonAddSavedMeal]").click();
          cy.contains("Select").first().click();
        }

        const verify = () => {
          const secondCard = cy.get("[data-cy=mealCard]").eq(1);
          secondCard.should("contain", "food 1");
        }

        given();
        then();
        verify();

      })

      function firstMealCard() {
        return cy.get("[data-cy=mealCard]").first();
      }

      function exitAddMealState() {
        cy.get("form").contains("Cancel").click();
      }

      function addFood(foodDescription: string) {
        cy.get("form")
          .within(() => {
            cy.get("#inputFoodDescription")
              .type(foodDescription)
              .type("{esc}"); // escape to close combo dropdown so it does not block Add button
            cy.contains("Add").click();
          })
      }

      function saveMeal() {
        cy.contains("Save").click();
      }

      function closeSavedMealsOffcanvas() {
        cy.get('#savedMeals')
        .contains('Saved Meals')
        .parent()
        .within(() => {
          cy.get('button').first().click();
        });
      }
    })
  })
})