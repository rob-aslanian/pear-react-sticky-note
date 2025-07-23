import { useEffect, useState } from "react";

export default ({ hyperdrive }) => {
  const [notes, setNotes] = useState({});

  useEffect(() => {
    getNotes();
  }, []);

  async function getNotes() {
    const buf = await hyperdrive.get("/meta/notes.json");
    setNotes(JSON.parse(buf));
  }

  useEffect(() => {
    const notesWatcher = hyperdrive.watch("/meta", {
      recursive: false,
    });

    watchForever();
    async function watchForever() {
      for await (const _ of notesWatcher) {
        // eslint-disable-line no-unused-vars
        await getNotes();
      }
    }

    return async () => {
      await notesWatcher.destroy();
    };
  }, [hyperdrive]);

  return {
    notes,
  };
};
