/* global Pear */

import { html } from "htm/react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { generateDefaultNote } from "../utilities/defaultNote";
import { PeersContext } from "./peers";

const NoteContext = createContext();

function NoteProvider({ ...props }) {
  const [notes, setNotes] = useState([]);
  const peers = useContext(PeersContext);

  useEffect(() => {
    peers.hyperdrive.ready().then(initNote);
  }, [peers.hyperdrive]);

  async function initNote() {
    const exists = await peers.hyperdrive.exists("/meta/notes.json");
    if (exists) return;
    await updateNote(generateDefaultNote());
  }

  async function updateNote(note) {
    await peers.hyperdrive.put(
      "/meta/notes.json",
      Buffer.from(JSON.stringify([...notes, note])),
    );
  }

  async function getNotes() {
    const buf = await peers.hyperdrive.get("/meta/notes.json");
    console.log(JSON.parse(buf), "c".repeat(100));

    setNotes(JSON.parse(buf));
  }

  useEffect(() => {
    const noteWatcher = peers.hyperdrive.watch("/meta", {
      recursive: false,
    });

    watchForever();
    async function watchForever() {
      await getNotes();
    }

    return async () => {
      await noteWatcher.destroy();
    };
  }, [peers.hyperdrive]);

  return html`
    <${NoteContext.Provider}
      value=${{
        notes,
        updateNote,
      }}
      ...${props}
    />
  `;
}

export { NoteContext, NoteProvider };
