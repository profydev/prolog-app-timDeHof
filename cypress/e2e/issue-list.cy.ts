import mockIssues1 from "../fixtures/issues-page-1.json";
import mockIssues2 from "../fixtures/issues-page-2.json";
import mockIssues3 from "../fixtures/issues-page-3.json";

describe("Issue List", () => {
  beforeEach(() => {
    // setup request mocks
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&projectId=undefined&limit=10",
      {
        fixture: "issues-page-1.json",
      }
    ).as("getIssuesPage1");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=2&projectId=undefined&limit=10",
      {
        fixture: "issues-page-2.json",
      }
    ).as("getIssuesPage2");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=3&projectId=undefined&limit=10",
      {
        fixture: "issues-page-3.json",
      }
    ).as("getIssuesPage3");

    // open issues page
    cy.visit(`http://localhost:3000/dashboard/issues`);

    // wait for request to resolve
    cy.wait(["@getProjects", "@getIssuesPage1"]);
    cy.wait(500);

    // set button aliases
    cy.get("button").contains("Previous").as("prev-button");
    cy.get("button").contains("Next").as("next-button");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the issues", () => {
      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el, index) => {
          const issue = mockIssues1.items[index];
          const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
          cy.wrap($el).contains(issue.name);
          cy.wrap($el).contains(issue.message);
          cy.wrap($el).contains(issue.numEvents);
          cy.wrap($el).contains(issue.numUsers);
          cy.wrap($el).contains(firstLineOfStackTrace);
        });
    });

    it("paginates the data", () => {
      // test first page
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");

      // test navigation to second page
      cy.get("@next-button").click();
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);

      // test navigation to third and last page
      cy.get("@next-button").click();
      cy.get("@next-button").should("have.attr", "disabled");
      cy.contains("Page 3 of 3");
      cy.get("tbody tr:first").contains(mockIssues3.items[0].message);

      // test navigation back to second page
      cy.get("@prev-button").click();
      cy.get("@next-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);
    });

    it("persists page after reload", () => {
      cy.get("@next-button").click();
      cy.wait(500);
      cy.contains("Page 2 of 3");

      cy.reload();
      cy.wait(["@getProjects", "@getIssuesPage2"]);
      cy.wait(10000);
      cy.contains("Page 2 of 3");
    });
  });

  context("checks for filtered issues by project id", () => {
    const projectIds = [
      "6d5fff43-d691-445d-a41a-7d0c639080e6",
      "340cb147-6397-4a12-aa77-41100acf085f",
      "9aa6a101-2c92-4797-b497-b31b2cb4c94b",
    ];

    beforeEach(() => {
      // Visit the main dashboard page
      cy.visit(`http://localhost:3000/dashboard`);
    });

    it("does the project card link's 'href' has correct project id", () => {
      cy.getByData("projectCard").each(($projectCard, index) => {
        // find the project card link and checks it
        cy.wrap($projectCard)
          .find("a")
          .contains("View issues")
          .should("have.attr", "href")
          .should("include", `projectId=${projectIds[index]}`);
      });
    });
  });
});
