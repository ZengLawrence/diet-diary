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
    cy.get("[data-cy=meal-1]").get("[data-cy=formAdd]").should("exist");

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
    cy.get("[data-cy=mealCards]").get("[data-cy=meal-0]").contains("Delete").click();

    cy.get("[data-cy=mealCards]").should("be.empty");

  })

  it("name button should appear when exiting edit mode and there at least 2 foods", () => {

    const setUp = () =>{
      cy.get("form").contains("Cancel").click(); // exit add mode
    }
    setUp();
    cy.get("[data-cy=meal-0]").should("not.contain", "Name");

    const addFood = (foodDescription: string) => {
      cy.get("[data-cy=meal-0]").contains("Edit").click();
      cy.get("[data-cy=meal-0]").get("[data-cy=buttonNewFood]").click();
      cy.get("form").get("#inputFoodDescription").type(foodDescription);
      cy.get("form").contains("Add").click();
    }
    const exitEditMode = () => {
      cy.get("form").contains("Cancel").click(); // exit add mode
    }

    addFood("food 1");
    exitEditMode();
    cy.get("[data-cy=meal-0]").should("not.contain", "Name");

    addFood("food 2");
    exitEditMode();
    cy.get("[data-cy=meal-0]").should("contain", "Name");

  })

})