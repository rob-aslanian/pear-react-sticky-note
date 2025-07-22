import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { html } from "htm/react";
import { createRoot } from "react-dom/client";
import App from "./src/App.js";
import { PeersProvider } from "./src/context/peers.js";
// import { PeersProvider } from "./src/context/peers";
// import { UserProvider } from "./src/context/user";

const { app } = await Pear.versions();
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const root = createRoot(document.querySelector("#root"));
root.render(html`
  <${ThemeProvider} theme=${theme}>
    <${CssBaseline} />
    <${PeersProvider}
      topic=${"57337a386673415371314f315a6d386f504576774259624e32446a7377393752"}
    >
      <${App} />
    </${PeersProvider}>
  </${ThemeProvider}>
`);
