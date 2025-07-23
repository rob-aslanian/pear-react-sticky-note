import { Collapse, Row } from "antd";
import { html } from "htm/react";
import PeerItem from "./PeerItem";
const { Panel } = Collapse;

export default () => {
  return html`
    <${Collapse}  >
        <${Panel} header="This is panel header 1" key="1">
            <${Row}  justify="space-between">
                <${PeerItem} />
            </${Row}>
        </${Panel}>
    </${Collapse}>
    `;
};
