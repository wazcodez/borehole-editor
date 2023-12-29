describe("Logging In - CSRF Tokens", function () {
  const username = "jamm";
  const password = "jamm";
  const protectedPage = "http://localhost:3000/home/boreholes";
  const loginPage = "http://localhost:3000/auth/signin";

  Cypress.Commands.add("loginByCSRF", (csrfToken) => {
    cy.request({
      method: "POST",
      url: "/api/auth/callback/credentials",
      failOnStatusCode: false, // dont fail so we can make assertions
      form: true, // we are submitting a regular form body
      body: {
        username,
        password,
        csrfToken: csrfToken, // insert this as part of form body
      },
    });
  });

  const inDashboard = () => {
    cy.location("href").should("match", /boreholes$/);
  };

  const visitDashboard = () => {
    cy.visit(protectedPage);
    inDashboard();
  };

  beforeEach(function () {
    cy.viewport(500, 380);
  });

  it("redirects to login page when not logged in", () => {
    cy.visit(protectedPage);
    cy.location("href").should("match", /signin$/);
  });

  it("upon login redirects to borehole page", function () {
    // if we cannot change our server code to make it easier
    // to parse out the CSRF token, we can simply use cy.request
    // to fetch the login page, and then parse the HTML contents
    // to find the CSRF token embedded in the page
    cy.request(loginPage)
      .its("body")
      .then((body) => {
        // we can use Cypress.$ to parse the string body
        // thus enabling us to query into it easily
        const $html = Cypress.$(body);
        const csrf = $html.find("input[name=csrfToken]").val();

        cy.loginByCSRF(csrf).then((resp) => {
          expect(resp.status).to.eq(200);
        });
      });

    visitDashboard();
  });
});
