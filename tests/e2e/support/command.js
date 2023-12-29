const username = "jamm";
const password = "jamm";
const loginPage = "http://localhost:3000/auth/signin";
const protectedPage = "http://localhost:3000/home/boreholes";
const newBoreholeReqesutUrl = "http://localhost:3000/api/boreholes";

Cypress.Commands.add("newBorehole", (name, id) => {
  cy.request({
    method: "POST",
    url: newBoreholeReqesutUrl,
    failOnStatusCode: true,
    form: false,
    body: JSON.stringify({
      borehole_title: "e2e-" + name,
      borehole_id: id,
    }),
  });
});

Cypress.Commands.add("removeBorehole", (name, id) => {
  cy.request({
    method: "DELETE",
    url: newBoreholeReqesutUrl,
    failOnStatusCode: true,
    form: false,
    body: JSON.stringify({
      borehole_title: "e2e-" + name,
      borehole_id: id,
    }),
  });
});

Cypress.Commands.add("login", (csrfToken) => {
  cy.request(loginPage)
    .its("body")
    .then((body) => {
      const $html = Cypress.$(body);
      const csrf = $html.find("input[name=csrfToken]").val();

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/auth/callback/credentials",
        failOnStatusCode: false,
        form: true,
        body: {
          username,
          password,
          csrfToken: csrf,
        },
      });
    });

  Cypress.Cookies.preserveOnce(
    "next-auth.session-token",
    "next-auth.callback-url",
    "next-auth.csrf-token"
  );
});
