import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;
        if (credentials.username === "jamm" && credentials.password == "jamm") {
          user = { id: 1, name: "Jamm Demo", email: "jammdemo@jammtek.com" };
        }
        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: null, // If set, new users will be directed here on first sign in
  },
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    redirect: async (url, baseUrl) => {
      return Promise.resolve(url);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
