import { Empty } from "antd";
import { html } from "htm/react";
import PeerTitle from "../components/PeerTitle";
import PeersCollapse from "../components/PeersCollapse";

export default ({ peers }) => {
  return html`
    <div style=${{ padding: "1rem", height: "100%" }}>
      ${peers?.length
        ? html`<${PeerTitle} peers=${peers} />
            <${PeersCollapse} peers=${peers} />`
        : html`<${Empty}
            description="No peers connected"
            className="center-content"
          />`}
    </div>
  `;
};
