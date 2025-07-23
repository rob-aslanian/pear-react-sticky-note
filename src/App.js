import { PlusOutlined } from "@ant-design/icons";
import { Button, Layout, Row, Typography } from "antd";
import { html } from "htm/react";
import { useContext, useEffect, useState } from "react";
import AddNote from "./components/AddNote";
import { PeersContext } from "./context/peers";
const { Content } = Layout;
const { Title } = Typography;

Pear.updates(() => Pear.reload());

const App = () => {
  const peersContent = useContext(PeersContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    console.log(peersContent.peers);
  }, [peersContent.peers]);

  const addNote = () => {
    const newNote = {
      id: crypto.randomUUID(),
      text: "",
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      zIndex: Date.now(),
      color: "#ffff88",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
  };

  return html`
    <${Layout}>
      <${Content} style=${{ padding: "2rem" }}>
        <${Row} justify="space-between" align="middle">
          <${Title}>🗒️ Sticky Notes</${Title}>
          <${Button}
            type="button"
            onClick=${addNote}
            icon=${html`<${PlusOutlined} />`}
          >
            Add Note
          </${Button}>
        </${Row}>
        <${AddNote} />
      </${Content}>
    </${Layout}>
  `;
};

export default App;
