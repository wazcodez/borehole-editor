import uuidv4 from "./../../../util/uuid";

describe("Water level test", () => {
  const testSessionId = uuidv4().substring(1, 6);
  const testBoreholeName = "water-label" + "-" + testSessionId;
  const testBoreholeId = "water-label" + "-" + testSessionId;

  before(() => {
    cy.login();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce(
      "next-auth.session-token",
      "next-auth.callback-url",
      "next-auth.csrf-token"
    );
  });

  it("exists in list of components", () => {
    cy.newBorehole(testBoreholeName, testBoreholeId);
    cy.visit("http://localhost:3000/home/boreholes");
    cy.contains(testBoreholeName).click();
    cy.visit("http://localhost:3000/home/boreholes");
    cy.removeBorehole(testBoreholeName, testBoreholeId);
  });
});
