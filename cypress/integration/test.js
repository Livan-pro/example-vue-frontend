describe("App", () => {
  it("successfully loads", () => {
    cy.visit("/");
  });
  it("has at least one ATS in DOM", () => {
    cy.get(".ats-select .radio:not(.radio_warn)");
  });
  it("has next button disabled", () => {
    cy.get(".body__next-button").should("have.class", "button_disabled");
  });
  it("has next button enabled after selecting ATS", () => {
    cy.get(".ats-select .radio:not(.radio_warn)").first().click();
    cy.get(".body__next-button").should("not.have.class", "button_disabled");
  });
  it("has changed header after clicking next button", () => {
    const headerBefore = cy.get(".header__title").invoke("text");
    cy.get(".body__next-button").click();
    const headerAfter = cy.get(".header__title").invoke("text");
    expect(headerAfter).to.not.equal(headerBefore);
  });
  it("has solution title", () => {
    cy.get(".solution-title").should("not.be.empty");
  });
});
