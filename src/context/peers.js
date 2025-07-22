/* global Pear */

import Corestore from "corestore";
import { html } from "htm/react";
import Hyperbee from "hyperbee";
import hic from "hypercore-id-encoding";
import Hyperdrive from "hyperdrive";
import Hyperswarm from "hyperswarm";
import ProtomuxRPC from "protomux-rpc";
import { createContext, useEffect, useRef, useState } from "react";

const PeersContext = createContext();

function PeersProvider({ name, topic, ...props }) {
  const corestore = new Corestore(Pear.config.storage);
  const hyperdrive = new Hyperdrive(corestore);
  const [loaded, setLoaded] = useState(false);
  const [peers, setPeers] = useState([]);
  const hyperswarm = useRef();
  const hyperbee = new Hyperbee(corestore.get({ name: "peers" }), {
    keyEncoding: "utf-8",
    valueEncoding: "json",
  });

  useEffect(() => {
    loadPeers()
      .then(initSwarm)
      .then(() => setLoaded(true));

    async function loadPeers() {
      for await (const {
        key,
        value: { driveKey },
      } of hyperbee.createReadStream()) {
        add({ key, driveKey });
      }
    }

    async function initSwarm() {
      hyperswarm.current = new Hyperswarm({
        keyPair: await corestore.createKeyPair("first-app"),
      });

      console.log(hyperswarm.current);

      Pear.teardown(async () => {
        await hyperswarm.current.destroy();
      });

      hyperswarm.current.on("connection", async (conn, info) => {
        const key = conn.remotePublicKey.toString("hex");
        const rpc = new ProtomuxRPC(conn);
        console.log("[connection joined]", info);

        corestore.replicate(conn);

        rpc.respond("whoareyou", async (req) => {
          console.log("[whoareyou respond]");
          return Buffer.from(
            JSON.stringify({
              driveKey: hyperdrive.key.toString("hex"),
            }),
          );
        });

        conn.on("close", () => {
          console.log(`[connection left] ${conn}`);
          console.log("should update online status");
        });

        const peer = await hyperbee.get(key);
        const isAlreadyKnownPeer = !!peer;
        if (isAlreadyKnownPeer) return;

        const reply = await rpc.request("whoareyou");
        const { driveKey } = JSON.parse(reply.toString());
        await add({
          key,
          driveKey,
        });
      });

      const discovery = hyperswarm.current.join(hic.decode(topic), {
        server: true,
        client: true,
      });
      await discovery.flushed();
    }
  }, []);

  async function add({ key, driveKey }) {
    console.log(
      `[PeersProvider] add() key=${key} driveKey=${driveKey}`,
    );
    const hyperdrive = new Hyperdrive(corestore, driveKey);
    await hyperdrive.ready();
    await hyperbee.put(key, { driveKey });

    setPeers((peers) => ({
      ...peers,
      [key]: {
        hyperdrive,
      },
    }));
  }

  return html`
    <${PeersContext.Provider}
      value=${{
        loaded,
        peers,
      }}
      ...${props}
    />
  `;
}

export { PeersContext, PeersProvider };
