import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { init } from "emailjs-com";
import { initAmplitude } from "./utils/amplitude";

import { ContextProvider } from "./utils/savableContext";

// init amplitude
initAmplitude();

// init emailjs
init(process.env.REACT_APP_EMAILSJS_USER);

// init sentry
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  ignoreErrors: ["ResizeObserver loop limit exceeded"],
});

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById("root")
);
