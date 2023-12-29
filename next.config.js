const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return withBundleAnalyzer({
    poweredByHeader: false,
    env: {
      host: (() => {
        if (isDev) return "http://localhost:3000";
        else return "https://jammtek.com";
      })(),
      DB_URI: (() => {
        if (isDev)
          return "mongodb+srv://jamm_qa:yGfZnIvvOhf4Y5Mf@jammstaging.0qfcr.mongodb.net/liftoff-test?retryWrites=true&w=majority";
        else
          return "mongodb+srv://jamm_qa:yGfZnIvvOhf4Y5Mf@jammstaging.0qfcr.mongodb.net/liftoff?retryWrites=true&w=majority";
      })(),
    },
    async redirects() {
      return [
        {
          source: "/",
          destination: "/index.html",
          permanent: true,
        },
      ];
    },
  });
};
