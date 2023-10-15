// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import { render } from "react-dom";
import App from "./App";
const rootElement = document.getElementById("root");
render(<App />, rootElement);