describe("Footer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("footer visible", () => {
      // check if a footer appears
      cy.get("footer");
    });

    it("links working", () => {
      cy.get("footer").contains("Docs").should("have.attr", "href", "/#");

      cy.get("footer").contains("API").should("have.attr", "href", "/#");

      cy.get("footer").contains("Help").should("have.attr", "href", "/#");

      cy.get("footer").contains("Community").should("have.attr", "href", "/#");
    });
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");
    });

    it("footer visible", () => {
      // check if a footer appears
      cy.get("footer");
    });

    it("links working", () => {
      cy.get("footer").contains("Docs").should("have.attr", "href", "/#");

      cy.get("footer").contains("API").should("have.attr", "href", "/#");

      cy.get("footer").contains("Help").should("have.attr", "href", "/#");

      cy.get("footer").contains("Community").should("have.attr", "href", "/#");
    });
  });
});
