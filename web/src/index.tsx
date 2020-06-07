import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { mergeStyles, loadTheme } from "office-ui-fabric-react";
import { initializeIcons } from "@uifabric/icons";

initializeIcons();
// Inject some global styles
mergeStyles({
  selectors: {
    ":global(body), :global(html), :global(#app)": {
      margin: 0,
      padding: 0,
      height: "100vh",
    },
  },
});

loadTheme({
  palette: {
    themePrimary: "#ff709f",
  },
  semanticColors: {
    primaryButtonBackgroundHovered: "#f25d8e",
    primaryButtonBackgroundPressed: "#e24d7e",
  },
});

ReactDOM.render(<App />, document.getElementById("app"));
