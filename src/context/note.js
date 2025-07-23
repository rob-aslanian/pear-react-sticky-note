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
  const [note, setNote] = useState({});
  const peers = useContext(PeersContext);

  useEffect(() => {
    peers.hyperdrive.ready().then(initNote);
  }, [peers.hyperdrive]);

  async function initNote() {
    const exists = await peers.hyperdrive.exists("/meta/note.json");
    if (exists) return;
    await updateNote(generateDefaultNote());
  }

  async function updateNote(note) {
    await peers.hyperdrive.put(
      "/meta/note.json",
      Buffer.from(JSON.stringify(note)),
    );
  }

  async function getNote() {
    const buf = await peers.hyperdrive.get("/meta/note.json");
    console.log(JSON.parse(buf), "c".repeat(100));

    setNote(JSON.parse(buf));
  }

  useEffect(() => {
    const noteWatcher = peers.hyperdrive.watch("/meta", {
      recursive: false,
    });

    watchForever();
    async function watchForever() {
      await getNote();
    }

    return async () => {
      await noteWatcher.destroy();
    };
  }, [peers.hyperdrive]);

  return html`
    <${NoteContext.Provider}
      value=${{
        note,
        updateNote,
      }}
      ...${props}
    />
  `;
}

export { NoteContext, NoteProvider };
