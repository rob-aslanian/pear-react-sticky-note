import { FileTextOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { html } from "htm/react";

const { Title, Text } = Typography;

export default () => {
  return html`
   <div
    className="center-content"
    style=${{
      color: "#999",
      textAlign: "center",
    }}
    >
      <${FileTextOutlined}
        style=${{
          fontSize: 48,
          marginBottom: 16,
        }}
      />
      
      <${Title} level=${4}>
        No sticky notes
      </${Title}>

      <${Text} type="secondary">
        Click the "Add Note" button to create one.
      </${Text}>
    </div>
  `;
};
