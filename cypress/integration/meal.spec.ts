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

    cy.get("[data-cy=meal-0]")
      .get(".list-group")
      .children().should("have.length", 4)  // 3 new foods + add food button
      .first().should("contain", "food 1").should("contain", "Edit")
      .next().should("contain", "food 2").should("contain", "Edit")
      .next().should("contain", "food 3").should("contain", "Edit")
      .next().get("[data-cy=buttonNewFood]").should("exist");  
  })

  it("delete a meal", () => {
    cy.get("[data-cy=mealCards]").get("[data-cy=meal-0]").contains("Delete").click();

    cy.get("[data-cy=mealCards]").should("be.empty");

  })

  it("name button should appear when exiting add meal state and there are at least 2 foods", () => {

    const exitAddMealState = () => {
      cy.get("form").contains("Cancel").click();
    }
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

})