import { DeleteOutlined, PushpinOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";
import { html } from "htm/react";
import { useState } from "react";
import Draggable from "react-draggable";
import ColorPicker from "./ColorPicker.js";

export default ({ note, onUpdate, onDelete }) => {
  let zIndex = note.zIndex || 0;
  const [inputValue, setInputValue] = useState(note.text || "");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onUpdate(note.id, { text: e.target.value });
  };

  const bringToFront = () => {
    zIndex += 1;
    onUpdate(note.id, { zIndex });
  };

  const handleDrag = (e, data) => {
    onUpdate(note.id, { x: data.x, y: data.y });
  };

  return html`
    <${Draggable}
      handle=".drag-handle"
      position=${{ x: note.x, y: note.y }}
      onStop=${handleDrag}
    >
      <div
        className="drag-handle"
        onClick=${bringToFront}
        style=${{
          background: note.color,
          zIndex: note.zIndex,
          position: "absolute",
          borderRadius: 6,
          padding: 10,
          height: "200px",
          width: "200px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
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
          onInput=${handleInputChange}
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
          <${ColorPicker}
            value=${note.color}
            onChange=${(color) => onUpdate(note.id, { color })}
          />
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
              onClick=${() => onDelete(note.id)}
            />
          </${Tooltip}>
        </div>
      </div>
    </${Draggable}>
  `;
};
