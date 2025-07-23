import { DeleteOutlined, PushpinOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";
import { html } from "htm/react";
import { useState } from "react";
import ColorPicker from "./ColorPicker.js";

export default ({ note }) => {
  const [inputValue, setInputValue] = useState("");

  const bringToFront = () => {
    // onUpdate(note.id, { zIndex: Date.now() });
  };

  return html`
    <div
      className="drag-handle"
      onMouseDown=${bringToFront}
      style=${{
        background: note.color,
        zIndex: note.zIndex,
        position: "absolute",
        borderRadius: 6,
        padding: 10,
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        width: "50%",
        height: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "move",
      }}
    >
      <${Input.TextArea}
        autoSize=${{ minRows: 5, maxRows: 10 }}
        value=${inputValue}
        variant=${false}
        onInput=${(e) => setInputValue(e.target.value)}
        placeholder="Enter note content"
        style=${{
          background: "transparent",
          flex: 1,
        }}
      />
      <div
        style=${{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <${ColorPicker} value=${"red"} />
        <${Tooltip} title="Pin on top">
          <${Button}
            icon=${html`<${PushpinOutlined} />`}
            onClick=${bringToFront}
          />
        </${Tooltip}>
        <${Tooltip} title="Delete note">
          <${Button}
            icon=${html`<${DeleteOutlined} />`}
            danger
            onClick=${() => {}}
          />
        </${Tooltip}>
      </div>
    </div>
  `;
};
