import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Enable structured logging
  enableLogs: true,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1.0,

  // Capture console.warn and console.error on edge
  integrations: [
    Sentry.consoleLoggingIntegration({ levels: ["warn", "error"] }),
  ],

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  environment: process.env.NODE_ENV,
});
