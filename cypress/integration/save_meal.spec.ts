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

      it("save a meal", () => {
        const setUp = () => {
          // add some foods
          firstMealCard()
            .within(() => {
              addFood("food 1");
              addFood("food 2");
              addFood("food 3");
            })
        }

        setUp();
        firstMealCard()
          .within(() => {
            cy.contains("Save").click();
          });

      })

      function firstMealCard() {
        return cy.get("[data-cy=mealCard]").first();
      }

      function addFood(foodDescription: string) {
        cy.get("form")
          .within(() => {
            cy.get("#inputFoodDescription").type(foodDescription);
            cy.contains("Add").click();
          })
      }


    })
  })
})