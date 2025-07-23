import { html } from "htm/react";
import { createRoot } from "react-dom/client";
import App from "./src/App.js";
import { NoteProvider } from "./src/context/note.js";
import { PeersProvider } from "./src/context/peers.js";

const root = createRoot(document.querySelector("#root"));
root.render(html`
    <${PeersProvider}
      topic=${"57337a386673415371314f315a6d386f504576774259624e32446a7377393752"}
    >
    <${NoteProvider}>
      <${App} />
    </${NoteProvider}>
    </${PeersProvider}>
`);
