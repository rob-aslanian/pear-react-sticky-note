import { html } from "htm/react";
import EmptyState from "./EmptyState";
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
    ${notes.length === 0
      ? html`<${EmptyState} />`
      : notes.map(
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
