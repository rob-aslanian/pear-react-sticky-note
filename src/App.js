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

  useEffect(() => {
    noteContext.updateNotes(notes);
  }, [notes]);

  const addNote = () => {
    const newNote = generateDefaultNote();
    setNotes([...notes, newNote]);
    noteContext.updateNotes([...notes, newNote]);
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
        <${NoteBoard} notes=${notes} onUpdate=${updateNote} onDelete=${deleteNote}/>
      </${Content}>
    </${Layout}>
  `;
};

export default App;
