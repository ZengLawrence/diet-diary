context("Meal operations", () => {
  beforeEach(() => {
    // clear app state
    cy.clearLocalStorage();
    cy.visit("/");
  })

  it("add a new meal", () => {
    cy.get("#buttonAddMeal").click();

    cy.get("#mealCards").last().should("contain", "Delete");
    cy.get("#mealCards").last().should("contain", "Edit");
    cy.get("#mealCards").last().get("#formAdd").should("exist");

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
    cy.get("#mealCards").first().contains("Edit").click();

    cy.get("#mealCards").first().should("contain", "Delete");
    cy.get("#mealCards").first().should("contain", "Done");
    cy.get("#mealCards").first().contains("food 1").parentsUntil(".list-group-item").should("contain", "Edit");
    cy.get("#mealCards").first().contains("food 2").parentsUntil(".list-group-item").should("contain", "Edit");
    cy.get("#mealCards").first().contains("food 3").parentsUntil(".list-group-item").should("contain", "Edit");
    cy.get("#mealCards").first().get("#buttonAddMeal").should("exist");

  })

  it("delete a meal", () => {
    cy.get("#mealCards").contains("Delete").click();

    cy.get("#mealCards").should("be.empty");

  })

})