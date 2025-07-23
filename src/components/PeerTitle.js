import { Typography } from "antd";
import { html } from "htm/react";
const { Title } = Typography;

export default function PeerTitle({ peers }) {
  return html`
    <${Title} level=${4} style=${{
    margin: "2rem",
    textAlign: "center",
  }}>
      ${"Peers: " + peers.length}
    </${Title}>
  `;
}
