import { PlusOutlined } from "@ant-design/icons";
import { Button, Layout, Row, Typography } from "antd";
import { html } from "htm/react";
import { useContext, useEffect, useState } from "react";
import NoteBoard from "./components/NoteBoard";
import { NoteContext } from "./context/note";
import { PeersContext } from "./context/peers";
import { generateDefaultNote } from "./utilities/defaultNote";
const { Content } = Layout;
const { Title } = Typography;

Pear.updates(() => Pear.reload());

const App = () => {
  const peersContent = useContext(PeersContext);
  const noteContext = useContext(NoteContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // console.log(peersContent.peers);
  }, [peersContent.peers]);

  useEffect(() => {
    setNotes(noteContext.notes);
  }, [noteContext.notes]);

  const addNote = () => {
    const newNote = generateDefaultNote();
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
        <${NoteBoard} notes=${notes}/>
      </${Content}>
    </${Layout}>
  `;
};

export default App;
