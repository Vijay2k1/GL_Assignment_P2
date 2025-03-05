// src/styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background}; /* Theme background color */
    color: ${(props) => props.theme.color}; /* Text color based on the theme */
    font-family: Arial, Helvetica, sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  button {
    background-color: ${(props) => props.theme.buttonBackground}; /* Button background color */
    color: ${(props) => props.theme.buttonText}; /* Button text color */
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    opacity: 0.8;
  }
`;

export default GlobalStyles;
