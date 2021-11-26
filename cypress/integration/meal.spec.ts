context("Meal operations", () => {
  beforeEach(() => {
    // clear app state
    cy.clearLocalStorage();
    cy.visit("/");
  })

  it("add a new meal", () => {
    cy.get("[data-cy=buttonAddMeal]").click();

    cy.get("[data-cy=mealCards")
      .children().should("have.length", 2)
      .last()
      .should("contain", "Delete")
      .should("contain", "Edit")
      .within(() => {
        cy.get("[data-cy=formAdd]").should("exist");
      });
  })

  it("edit a meal", () => {
    const addFood = (foodDescription: string) => {
      cy.get("form")
        .within(() => {
          cy.get("#inputFoodDescription").type(foodDescription);
          cy.contains("Add").click();
        })

    }
    const setUp = () => {
      // add some foods
      addFood("food 1");
      addFood("food 2");
      addFood("food 3");
      exitAddMealState();
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
      .within(() => {
        cy.get(".list-group")
          .children().should("have.length", 4)  // 3 new foods + add food button
          .first().should("contain", "food 1").should("contain", "Edit")
          .next().should("contain", "food 2").should("contain", "Edit")
          .next().should("contain", "food 3").should("contain", "Edit")
          .next().get("[data-cy=buttonNewFood]").should("exist");
      });
  })

  it("delete a meal", () => {
    cy.get("[data-cy=mealCards]").get("[data-cy=meal-0]").contains("Delete").click();

    cy.get("[data-cy=mealCards]").should("be.empty");

  })

  it("name button should appear when exiting add meal state and there are at least 2 foods", () => {

    exitAddMealState();
    cy.get("[data-cy=meal-0]").should("not.contain", "Name");

    const addFood = (foodDescription: string) => {
      cy.get("[data-cy=meal-0]").contains("Edit").click();
      cy.get("[data-cy=meal-0]").get("[data-cy=buttonNewFood]").click();
      cy.get("form").get("#inputFoodDescription").type(foodDescription);
      cy.get("form").contains("Add").click();
    }

    addFood("food 1");
    exitAddMealState();
    cy.get("[data-cy=meal-0]").should("not.contain", "Name");

    addFood("food 2");
    exitAddMealState();
    cy.get("[data-cy=meal-0]").should("contain", "Name");

  })

  function exitAddMealState() {
    cy.get("form").contains("Cancel").click();
  }

  function firstMealCard() {
    return cy.get("[data-cy=mealCards")
      .children()
      .first();
  }

})