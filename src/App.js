import { html } from "htm/react";
import { useContext, useEffect, useState } from "react";
import { PeersContext } from "./context/peers";

Pear.updates(() => Pear.reload());

const App = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const peersContent = useContext(PeersContext);

  useEffect(() => {
    console.log(peersContent.peers);
  }, [peersContent.peers]);

  const addNote = async () => {
    if (!input.trim()) return;

    console.log(notes);

    const note = {
      id: "123123123",
      content: input,
      createdAt: Date.now(),
    };
    // const feed = new Hyperbee(
    //   corestoreRef.current.get({ name: "peers" }),
    //   {
    //     keyEncoding: "utf-8",
    //     valueEncoding: "json",
    //   },
    // );
    // console.log(feed);

    // await new Promise((resolve) => feed.ready(resolve));
    // feed.append(note);
    setInput("");
  };

  return html`
    <div className="min-h-screen bg-yellow-100 p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">P2P Sticky Notes</h1>

      <div className="flex gap-2 mb-4 mr-2">
        <input
          value=${input}
          onChange=${(e) => setInput(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Type your note..."
        />
        <button
          onClick=${addNote}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4"></div>
      <div style=${{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        ${notes.map(
          (note) =>
            html`
              <div
                key=${note.id}
                style=${{
                  background: "#fffacd",
                  padding: 10,
                  borderRadius: 5,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  width: 200,
                }}
              >
                <p>${note.content}</p>
                <small
                  >${new Date(note.createdAt).toLocaleString()}</small
                >
              </div>
            `,
        )}
      </div>
    </div>
  `;
};

export default App;
