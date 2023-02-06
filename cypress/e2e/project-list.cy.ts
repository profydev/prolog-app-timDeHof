import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");
    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];
      const statusName = ["critical", "warning", "stable"];
      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el).contains(capitalize(statusName[index]));
          console.log(JSON.stringify(mockProjects[0].name).replace(" ", "%20"));
          cy.wrap($el)
            .find("a")
            .should(
              "have.attr",
              "href",
              `/dashboard/issues?project=${encodeURIComponent(
                mockProjects[index].name
              )}&page=1`
            );
        });
    });
  });
});

describe("checking for Loading Spinner", () => {
  it("should show spinner and hides it when projects loads", () => {
    cy.intercept("GET", "https://prolog-api.profy.dev/project", (req) => {
      req.reply({
        statusCode: 200,
        delay: 2000,
        fixture: "projects.json",
      });
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    cy.get('[data-cy="spinner"]')
      .should("be.visible")
      .then(() => {
        // wait for request to resolve
        cy.wait("@getProjects");
        cy.getByData("spinner").should("not.exist");
        cy.get("a").contains("View issues");
      });
  });
});

describe("check for Error component", () => {
  const ErrorMsg = "There was a problem while loading the project data";

  it("simulates an error when projects cannot be displayed", () => {
    cy.intercept("GET", "https://prolog-api.profy.dev/project", (req) => {
      req.reply({
        statusCode: 500,
        delay: 2000,
        fixture: "projects.json",
      });
    }).as("getNetworkFailure");

    cy.visit("http://localhost:3000/dashboard");
    cy.wait("@getNetworkFailure");
    cy.wait(10000);
    // checks if the error message appears
    cy.getByData("errorContainer").should("be.visible");
    cy.contains(ErrorMsg).should("be.visible");
    // check if the correct img exists
    cy.getByData("TryAgainImg").should(
      "have.attr",
      "src",
      "/icons/arrow-right.svg"
    );
  });
});
