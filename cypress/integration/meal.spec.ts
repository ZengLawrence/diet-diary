context("Meal operations", () => {
  beforeEach(() => {
    // clear app state
    cy.clearLocalStorage();
    cy.visit("/");
  })

  it("add a new meal", () => {
    cy.get("[data-cy=buttonAddMeal]").click();

    // Adding a new meal will create a second meal card (index=1)
    cy.get("[data-cy=meal-1]").should("contain", "Delete");
    cy.get("[data-cy=meal-1]").should("contain", "Edit");
    cy.get("[data-cy=meal-1]").get("#formAdd").should("exist");

  })

  it("edit a meal", () => {
    const setUp = () => {
      // add some foods
      cy.get("form").get("#inputFoodDescription").type("food 1");
      cy.get("form").contains("Add").click();
      cy.get("form").get("#inputFoodDescription").type("food 2");
      cy.get("form").contains("Add").click();
      cy.get("form").get("#inputFoodDescription").type("food 3");
      cy.get("form").contains("Add").click();
      cy.get("form").contains("Cancel").click();
    }

    setUp();
    cy.get("[data-cy=meal-0]").contains("Edit").click();

    cy.get("[data-cy=meal-0]").should("contain", "Delete");
    cy.get("[data-cy=meal-0]").should("contain", "Done");

    cy.get("[data-cy=meal-0]").get("[data-cy=food-0-0]").should("contain", "food 1").should("contain", "Edit");
    cy.get("[data-cy=meal-0]").get("[data-cy=food-0-1]").should("contain", "food 2").should("contain", "Edit");
    cy.get("[data-cy=meal-0]").get("[data-cy=food-0-2]").should("contain", "food 3").should("contain", "Edit");
    cy.get("[data-cy=meal-0]").get("[data-cy=buttonAddMeal]").should("exist");

  })

  it("delete a meal", () => {
    cy.get("#mealCards").contains("Delete").click();

    cy.get("#mealCards").should("be.empty");

  })

})