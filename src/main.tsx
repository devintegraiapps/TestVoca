import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import "./styles/index.css"; // ajuste se o seu CSS estiver em outro caminho (ex: "./index.css")

const container = document.getElementById("root");
if (!container) throw new Error("Elemento #root não encontrado no index.html");

createRoot(container).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
