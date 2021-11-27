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
      .within(() => {
        cy.get("[data-cy=formAdd]").should("exist");
      });
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
    firstMealCard().contains("Delete").click();

    cy.get("[data-cy=mealCard]").should("have.length", 0);

  })

  it("name button should appear when exiting add meal state and there are at least 2 foods", () => {

    firstMealCard().within(() => {
      exitAddMealState();
    }).within(() => {
      cy.get(".list-group").should("be.empty");
    }).should("not.contain", "Name");

    const openNewFoodForm = () => {
      cy.contains("Edit").click();
      cy.get(".list-group")
        .within(() => {
          cy.get("[data-cy=buttonNewFood]").click();
        });
    }

    firstMealCard().within(() => {
      openNewFoodForm();
      addFood("food 1");
      exitAddMealState();
    }).within(() => {
      cy.get(".list-group").children().should("have.length", 1);
    }).should("not.contain", "Name");

    firstMealCard().within(() => {
      openNewFoodForm();
      addFood("food 2");
      exitAddMealState();
    }).within(() => {
      cy.get(".list-group").children().should("have.length", 2);
    }).should("contain", "Name");

  })

  function exitAddMealState() {
    cy.get("form").contains("Cancel").click();
  }

  function firstMealCard() {
    return cy.get("[data-cy=mealCard").first();
  }

  function addFood(foodDescription: string) {
    cy.get("form")
      .within(() => {
        cy.get("#inputFoodDescription").type(foodDescription);
        cy.contains("Add").click();
      })
  }

})