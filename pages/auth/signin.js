import React from "react";
import { csrfToken } from "next-auth/client";

export default function SignIn({ csrfToken }) {
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <div className="bg-white shadow-md max-w-xs mx-auto bgrounded px-8 pt-6 pb-8 mb-4 py-12 mt-12 flex flex-col">
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            name="username"
            placeholder="Username"
          ></input>
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
          ></input>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue w-full hover:bg-blue-dark text-white max-w-xs font-bold py-2 px-4 rounded"
            type="submit"
            style={{ background: "#307fe2" }}
          >
            Sign In
          </button>
        </div>
      </div>
    </form>
  );
}

SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context),
  };
};
