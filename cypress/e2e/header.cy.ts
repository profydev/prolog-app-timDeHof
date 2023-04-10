describe("Header", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1440, 900);
    });

    it("header desktop components visible", () => {
      cy.get("header").should("be.visible");
      cy.get('[data-cy="test-logo"]').should(
        "have.attr",
        "src",
        "/icons/logo-large.svg"
      );
      cy.get("ul").find("li").should("have.length", 4);

      cy.get('a[color="primary"]')
        .should("be.visible")
        .contains("Open Dashboard");
    });

    it("header links should work", () => {
      cy.get("header")
        .get("ul")
        .get("li")
        .eq(0)
        .contains("Home")
        .should("have.attr", "href", "/");
      cy.get("header")
        .get("ul")
        .get("li")
        .eq(1)
        .contains("Products")
        .should("have.attr", "href", "/pages/products");
      cy.get("header")
        .get("ul")
        .get("li")
        .eq(2)
        .contains("Documentation")
        .should("have.attr", "href", "/pages/documentation");
      cy.get("header")
        .get("ul")
        .get("li")
        .eq(3)
        .contains("Pricing")
        .should("have.attr", "href", "/pages/pricing");
    });

    it("open dashboard should work", () => {
      cy.get('a[color="primary"]')
        .should("have.attr", "href", "/dashboard")
        .find("p")
        .contains("Open Dashboard")
        .click();
      cy.url().should("eq", "http://localhost:3000/dashboard");
    });
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");
    });
    it("header mobile component visible", () => {
      cy.get("header").should("be.visible");
      cy.get('[data-cy="test-logo"]').should(
        "have.attr",
        "src",
        "/icons/logo-large.svg"
      );
      cy.get('a[color="empty"]').should("be.visible");
    });

    it("header desktop components shouldn't be visible", () => {
      cy.get("ul").should("not.be.visible");
    });

    it("open dashboard should still work with hamburger button", () => {
      cy.get('a[color="empty"]').should("have.attr", "href", "/dashboard");
      cy.get('a[color="empty"]')
        .find("img")
        .should("have.attr", "src", "/icons/hamburger.svg");

      cy.get('a[color="empty"]').click();
      cy.url().should("eq", "http://localhost:3000/dashboard");
    });
  });
});
