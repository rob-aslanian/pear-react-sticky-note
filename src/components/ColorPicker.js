import { Select } from "antd";
import { html } from "htm/react";

const colorOptions = [
  "#ffff88",
  "#f8d7da",
  "#d4edda",
  "#cce5ff",
  "#fff3cd",
  "#e2e3e5",
];

export default ({ value, onChange }) => {
  return html`
        <${Select}
            value=${value}
            style=${{ width: 100 }}
            onChange=${onChange}
        >
            ${colorOptions.map(
              (c) => html`
                    <${Select.Option} key=${c} value=${c}>
                        <div style=${{ background: c, height: 20 }} />
                    </${Select.Option}>
                `,
            )}
        </${Select}>
    `;
};
