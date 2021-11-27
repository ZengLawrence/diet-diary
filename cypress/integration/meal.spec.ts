context("Meal operations", () => {
  beforeEach(() => {
    // clear app state
    cy.clearLocalStorage();
    cy.visit("/");
  })

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

  it("name button should appear when exiting add meal state and there are at least 2 foods", () => {

    firstMealCard().within(() => {
      exitAddMealState();
    }).find("[data-cy=foodItem]").should("have.length", 0);
    firstMealCard().should("not.contain", "Name");

    const openNewFoodForm = () => {
      cy.contains("Edit").click();
      cy.get("[data-cy=buttonNewFood]").click();
    }

    firstMealCard().within(() => {
      openNewFoodForm();
      addFood("food 1");
      exitAddMealState();
    }).find("[data-cy=foodItem]").should("have.length", 1);
    firstMealCard().should("not.contain", "Name");

    firstMealCard().within(() => {
      openNewFoodForm();
      addFood("food 2");
      exitAddMealState();
    }).find("[data-cy=foodItem]").should("have.length", 2);
    firstMealCard().should("contain", "Name");

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
        cy.get("#inputFoodDescription").type(foodDescription);
        cy.contains("Add").click();
      })
  }

})