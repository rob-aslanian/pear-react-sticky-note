import { Card } from "antd";
import { html } from "htm/react";

export default () => {
  return html`
    <${Card} size="small" title="Small size card" >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
    </${Card}>  
    `;
};
