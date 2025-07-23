import crypto from "crypto";
import { randomColor } from "./randomColor";

export const generateDefaultNote = () => {
  return {
    id: crypto.randomUUID(),
    text: "",
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    zIndex: Date.now(),
    color: randomColor(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
