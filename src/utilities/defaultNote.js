import crypto from "crypto";
import { randomColor } from "./randomColor";

export const generateDefaultNote = () => {
  return {
    id: crypto.randomUUID(),
    text: "",
    x: +Pear.config.options.gui.width / 2 - 150,
    y: +Pear.config.options.gui.height / 2 - 150,
    width: 200,
    height: 200,
    zIndex: 0,
    color: randomColor(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
