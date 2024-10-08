context("Meal operations", () => {
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

      it("add a new meal", () => {
        cy.get("[data-cy=buttonAddMeal]").click();

        cy.get("[data-cy=mealCard")
          .should("have.length", 2)
          .last()
          .should("contain", "Delete")
          .should("contain", "Edit")
          .find("[data-cy=formAdd]").should("exist");
      })

      it("edit a meal", () => {
        const setUp = () => {
          // add some foods
          firstMealCard()
            .within(() => {
              addFood("food 1");
              addFood("food 2");
              addFood("food 3");
              exitAddMealState();
            })
        }

        setUp();
        firstMealCard()
          .within(() => {
            cy.contains("Edit").click();
          });

        firstMealCard()
          .should("contain", "Delete")
          .should("contain", "Done");

        firstMealCard()
          .find("[data-cy=foodItem]")
          .should("have.length", 3)
          .first().should("contain", "food 1").should("contain", "Edit")
          .next().should("contain", "food 2").should("contain", "Edit")
          .next().should("contain", "food 3").should("contain", "Edit");
        firstMealCard().find("[data-cy=buttonNewFood]").should("exist");

      })

      it("delete a meal", () => {
        firstMealCard().contains("Delete").click();

        cy.get("[data-cy=mealCard]").should("have.length", 0);

      })

      function exitAddMealState() {
        cy.get("form").contains("Cancel").click();
      }

      function firstMealCard() {
        return cy.get("[data-cy=mealCard]").first();
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


    })
  })
})