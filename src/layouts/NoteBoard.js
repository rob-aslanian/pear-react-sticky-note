import { html } from "htm/react";
import Note from "../components/Note";
import EmptyState from "./EmptyState";

export default ({ notes, onUpdate, onDelete }) => {
  return html` <div
    style=${{
      position: "relative",
      height: "80vh",
      border: "1px solid #ddd",
    }}
  >
    ${notes?.length
      ? notes.map(
          (note) =>
            html`<${Note}
              key=${note.id}
              note=${note}
              onUpdate=${onUpdate}
              onDelete=${onDelete}
            />`,
        )
      : html`<${EmptyState} />`}
  </div>`;
};
