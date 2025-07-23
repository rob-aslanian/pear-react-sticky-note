import { Layout } from "antd";
import { html } from "htm/react";
import { useContext, useEffect } from "react";
import PeerTitle from "./components/PeerTitle";
import { PeersContext } from "./context/peers";
const { Header, Content } = Layout;

Pear.updates(() => Pear.reload());

const App = () => {
  const peersContent = useContext(PeersContext);

  useEffect(() => {
    console.log(peersContent.peers);
  }, [peersContent.peers]);

  return html`
    <${Layout}>
        <${Content}>
          <${PeerTitle} peer=${"No Peer Connected"} />
        </${Content}>
      </${Layout}>
  `;
};

export default App;
