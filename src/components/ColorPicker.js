import { Select } from "antd";
import { html } from "htm/react";
import { NOTE_COLORS } from "../constants/colors";

export default ({ value, onChange }) => {
  return html`
        <${Select}
            value=${value}
            style=${{ width: 100 }}
            onChange=${onChange}
        >
            ${NOTE_COLORS.map(
              (c) => html`
                    <${Select.Option} key=${c} value=${c}>
                        <div style=${{ background: c, height: 20 }} />
                    </${Select.Option}>
                `,
            )}
        </${Select}>
    `;
};
