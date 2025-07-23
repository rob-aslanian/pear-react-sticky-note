import { PlusOutlined } from "@ant-design/icons";
import { Button, Layout, Row, Typography } from "antd";
import { html } from "htm/react";
import { useContext, useEffect, useState } from "react";
import { NoteContext } from "./context/note";
import { PeersContext } from "./context/peers";
import NoteBoard from "./layouts/NoteBoard";
import PeersPanel from "./layouts/PeersPanel";
import { generateDefaultNote } from "./utilities/defaultNote";
const { Content, Header, Sider } = Layout;
const { Title } = Typography;

Pear.updates(() => Pear.reload());

const App = () => {
  const peersContent = useContext(PeersContext);
  const noteContext = useContext(NoteContext);
  const [notes, setNotes] = useState([]);
  const [peers, setPeers] = useState([]);

  useEffect(() => {
    setPeers(peersContent.peers);
  }, [peersContent.peers]);

  useEffect(() => {
    setNotes(noteContext.notes);
  }, [noteContext.notes]);

  useEffect(() => {
    noteContext.updateNotes(notes);
  }, [notes]);

  const addNote = () => {
    const newNote = generateDefaultNote(notes?.length);
    setNotes([...(notes || []), newNote]);
    noteContext.updateNotes([...(notes || []), newNote]);
  };

  const updateNote = (id, data) => {
    setNotes((notes) =>
      notes.map((note) =>
        note.id === id
          ? { ...note, ...data, updatedAt: new Date().toISOString() }
          : note,
      ),
    );
  };

  const deleteNote = (id) =>
    setNotes(notes.filter((n) => n.id !== id));

  return html`
    <${Layout}>
      <${Header} style=${{ padding: "0 1rem" }}>
        <${Row}
          justify="space-between"
          align="middle"
          style=${{ margin: "1rem 0", color: "red" }}
        >
          <${Title}
            level=${2}
            style=${{ margin: 0, color: "#fafafa" }}
          >
            🗒️ Sticky Notes
          </${Title}>

          <${Button}
            type="button"
            onClick=${addNote}
            style=${{ color: "#fafafa" }}
            icon=${html`<${PlusOutlined} />`}
          >
            Add Note
          </${Button}>
        </${Row}>
      </${Header}>

      <${Layout} style=${{ margin: "1rem" }}>
        <${Content} style=${{ paddingRight: "0.5rem" }}>
          <${NoteBoard}
            notes=${notes}
            onUpdate=${updateNote}
            onDelete=${deleteNote}
          />
        </${Content}>

        <${Sider}
          width="35%"
          peers=${peers}
          style=${{
            background: "transparent",
            border: "1px solid #ddd",
          }}
        >
          <${PeersPanel} peers=${peers} />
        </${Sider}>
      </${Layout}>
    </${Layout}>
`;
};

export default App;
