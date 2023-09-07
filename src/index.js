import "./i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

// Function to initialize the app
const initializeApp = () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  );
};

// Initialize i18next and the app
i18next.on("initialized", (options) => {
  initializeApp();
});

reportWebVitals();
