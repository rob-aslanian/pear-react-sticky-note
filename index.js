import { html } from "htm/react";
import { createRoot } from "react-dom/client";
import App from "./src/App.js";
import { NoteProvider } from "./src/context/note.js";
import { PeersProvider } from "./src/context/peers.js";

const root = createRoot(document.querySelector("#root"));
root.render(html`
  <${PeersProvider}
    name=${
      Pear.config.name
    } topic=${"6f4c6b537971744a6e6c6b586c574e6c6b7244424d6c4c754d707a7564456454"}
  >
    <${NoteProvider}>
      <${App} />
    </${NoteProvider}>
  </${PeersProvider}>
`);
