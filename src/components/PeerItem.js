import { Card, Empty } from "antd";
import { html } from "htm/react";
import usePeers from "../hooks/usePeers";

export default ({ hyperdrive }) => {
  const { notes } = usePeers({ hyperdrive });

  return html`
    ${notes?.length
      ? notes.map(
          (note) => html`
          <${Card}
            size="small"
            title=${"Note id: " + note.id.split("-")[0]}
            style=${{
              marginTop: "0.5rem",
              maxWidth: "100%",
              minWidth: "100%",
            }}
          >
            ${
              note.text &&
              html`
                <div>
                  <strong>Note: </strong>
                  <div
                    style=${{
                      whiteSpace: "normal",
                      overflowWrap: "break-word",
                    }}
                  >
                    ${note.text}
                  </div>
                </div>
              `
            }

            <p>
              <strong>Updated at:</strong> ${new Date(
                note.updatedAt,
              ).toLocaleString()}
            </p>

            <div style=${{ display: "flex", alignItems: "center" }}>
              <strong>Color used:</strong>
              <div
                style=${{
                  backgroundColor: note.color,
                  width: "20px",
                  height: "20px",
                  marginLeft: "0.25rem",
                  border: "1px solid #ccc",
                }}
              ></div>
            </div>
          </${Card}>
        `,
        )
      : html`
          <${Empty}
            description="No notes"
            className="center-content"
          />
        `}
  `;
};
