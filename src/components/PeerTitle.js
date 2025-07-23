import { Typography } from "antd";
import { html } from "htm/react";
const { Title } = Typography;

export default function PeerTitle({ peer }) {
  return html`
    <${Title} level=${3} style=${{
    margin: "2rem",
  }}>
      Current Peer : ${peer}
    </${Title}>
  `;
}
