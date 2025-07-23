import { html } from "htm/react";
import Note from "./Note";

export default ({ notes, onUpdate, onDelete }) => {
  return html` <div
    style=${{
      position: "relative",
      height: "80vh",
      border: "1px solid #ddd",
      marginTop: 20,
    }}
  >
    ${notes.map(
      (note) =>
        html`<${Note}
          key=${note.id}
          note=${note}
          onUpdate=${onUpdate}
          onDelete=${onDelete}
        />`,
    )}
  </div>`;
};
