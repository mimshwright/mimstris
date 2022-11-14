import { createSelector } from "reselect";
import config from "../config";
import { getLines } from "./lines";

export const getLevel = createSelector(getLines, (lines) =>
  Math.max(config.startLevel, Math.floor(lines / config.newLevelEvery))
);
