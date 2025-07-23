import { NOTE_COLORS } from "../constants/colors";

export const randomColor = () =>
  NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];
