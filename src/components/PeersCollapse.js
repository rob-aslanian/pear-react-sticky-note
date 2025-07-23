import { Collapse, Row } from "antd";
import { html } from "htm/react";
import PeerItem from "./PeerItem";
const { Panel } = Collapse;

export default ({ peers }) => {
  return html`
    <${Collapse}>
        ${peers.map(
          (peer) => html`
            <${Panel}
            className="ellipsis"
            header=${"Peer: " + peer.key}
            key=${peer.key}
            >
            <${Row} wrap justify="space-between">
                <${PeerItem} hyperdrive=${peer.hyperdrive} />
            </${Row}>
            </${Panel}>
        `,
        )}
    </${Collapse}>
`;
};
