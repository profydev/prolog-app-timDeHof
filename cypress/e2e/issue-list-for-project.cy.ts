// filtered issue pages
import mockProjectIssues1 from "../fixtures/issues-for-project-page-1.json";
import mockProjectIssues2 from "../fixtures/issues-for-project-page-2.json";
import mockProjectIssues3 from "../fixtures/issues-for-project-page-3.json";

describe("filtered issue list", () => {
  const projectId = "6d5fff43-d691-445d-a41a-7d0c639080e6";

  beforeEach(() => {
    // setup request mocks
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");
    cy.intercept(
      "GET",
      `https://prolog-api.profy.dev/issue?page=1&projectId=${projectId}&limit=10`,
      {
        fixture: "issues-for-project-page-1.json",
      }
    ).as("getProjectIssuesPage1");
    cy.intercept(
      "GET",
      `https://prolog-api.profy.dev/issue?page=2&projectId=${projectId}&limit=10`,
      {
        fixture: "issues-for-project-page-2.json",
      }
    ).as("getProjectIssuesPage2");
    cy.intercept(
      "GET",
      `https://prolog-api.profy.dev/issue?page=3&projectId=${projectId}&limit=10`,
      {
        fixture: "issues-for-project-page-3.json",
      }
    ).as("getProjectIssuesPage3");

    // open issues page
    cy.visit(
      `http://localhost:3000/dashboard/issues?projectId=${projectId}&page=1`
    );

    // wait for request to resolve
    cy.wait(["@getProjects", "@getProjectIssuesPage1"]);
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
          const issue = mockProjectIssues1.items[index];
          const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
          cy.wrap($el).contains(issue.name);
          cy.wrap($el).contains(issue.message);
          cy.wrap($el).contains(issue.numEvents);
          cy.wrap($el).contains(issue.numUsers);
          cy.wrap($el).contains(firstLineOfStackTrace);
          cy.wrap($el)
            .find("img")
            .should("have.attr", "src")
            .should("include", "/icons/react.svg");
        });
    });
    it("should NOT render the wrong project image", () => {
      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el) => {
          cy.wrap($el)
            .find("img")
            .should("have.attr", "src")
            .should("not.include", "/icons/node.svg");
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
      cy.get("tbody tr:first").contains(mockProjectIssues2.items[0].message);

      // test navigation to third and last page
      cy.get("@next-button").click();
      cy.get("@next-button").should("have.attr", "disabled");
      cy.contains("Page 3 of 3");
      cy.get("tbody tr:first").contains(mockProjectIssues3.items[0].message);

      // test navigation back to second page
      cy.get("@prev-button").click();
      cy.get("@next-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockProjectIssues2.items[0].message);
    });

    it("checks for the correct number of issues per page", () => {
      // test the first page
      cy.visit(
        `http://localhost:3000/dashboard/issues?projectId=${projectId}&page=1`
      );
      cy.wait("@getProjectIssuesPage1");
      cy.contains("Page 1 of 3");
      cy.get("main").find("tbody").find("tr").should("have.length", 9);

      // test the second page
      cy.visit(
        `http://localhost:3000/dashboard/issues?projectId=${projectId}&page=2`
      );
      cy.wait("@getProjectIssuesPage2");
      cy.contains("Page 2 of 3");
      cy.get("main").find("tbody").find("tr").should("have.length", 6);

      // test the third and final page
      cy.visit(
        `http://localhost:3000/dashboard/issues?projectId=${projectId}&page=3`
      );
      cy.wait("@getProjectIssuesPage3");
      cy.contains("Page 3 of 3");
      cy.get("main").find("tbody").find("tr").should("have.length", 7);
    });
  });
});
