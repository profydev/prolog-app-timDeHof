/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>;
    drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
    dismiss(
      subject: string,
      options?: Partial<TypeOptions>
    ): Chainable<Element>;
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    getBySel(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
  }
}
