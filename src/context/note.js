/* global Pear */

import { html } from "htm/react";
import { createContext, useContext, useEffect } from "react";
import { PeersContext } from "./peers";

const NoteContext = createContext();

function NoteProvider({ ...props }) {
  const peers = useContext(PeersContext);

  useEffect(() => {
    peers.hyperdrive.ready().then(initNote);
  }, [peers.hyperdrive]);

  async function initNote() {
    const exists = await peers.hyperdrive.exists("/meta/note.json");
    if (exists) return;
    await updateNote({ id: "1" });
  }

  async function updateNote(note) {
    await peers.hyperdrive.put(
      "/meta/note.json",
      Buffer.from(JSON.stringify(note)),
    );
  }

  async function getNote() {
    const buf = await peers.hyperdrive.get("/meta/note.json");
  }

  useEffect(() => {
    const noteWatcher = peers.hyperdrive.watch("/meta", {
      recursive: false,
    });

    watchForever();
    async function watchForever() {
      for await (const _ of noteWatcher) {
        // eslint-disable-line no-unused-vars
        await getNote();
      }
    }

    return async () => {
      await noteWatcher.destroy();
    };
  }, [peers.hyperdrive]);

  return html`
    <${NoteContext.Provider}
      value=${{
        updateNote,
      }}
      ...${props}
    />
  `;
}

export { NoteContext, NoteProvider };
