// src/App.js
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes"; // Import themes
import TaskDashboard from "./components/TaskDashboard"; // TaskDashboard Component
import GlobalStyles from "./styles/GlobalStyles"; // Import global styles

const App = () => {
  // State to toggle between light and dark themes
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Toggle between light and dark mode
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {/* Apply global styles */}
      <GlobalStyles />
      <div>
        <h1>Real-Time Task Management Dashboard</h1>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <TaskDashboard /> {/* Your TaskDashboard component */}
      </div>
    </ThemeProvider>
  );
};

export default App;
