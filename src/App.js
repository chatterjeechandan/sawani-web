import React, { useState, useEffect } from "react";
import Routes from "./routes/Routes";
import "@fortawesome/fontawesome-free/css/all.css";
import "./assets/css/styles.css";
import { AuthProvider } from "./utils/AuthContext";
import { CartProvider } from "./utils/CartContext";
import { CategoryProvider } from "./utils/CategoryContext";
import { setConfig } from "./config/site.config"; // Import your setConfig function

const App = () => {
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);

  useEffect(() => {
    fetch("/config.json")
      .then((response) => response.json())
      .then((data) => {
        setConfig(data);
        setIsConfigLoaded(true);
      })
      .catch((error) => console.error("Failed to load config:", error));
  }, []);

  return isConfigLoaded ? (
    <AuthProvider>
      <CategoryProvider>
        <CartProvider>
          <Routes />
        </CartProvider>
      </CategoryProvider>
    </AuthProvider>
  ) : (
    <div>Loading config...</div>
  );
};

export default App;
