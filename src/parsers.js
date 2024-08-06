import yaml from "js-yaml";
import path from "path";
import { readFileSync } from "node:fs";

const isJson = (file) => {
  if (file === undefined) return undefined;
  if (path.extname(file) === ".json") return true;
  return false;
};

const isYaml = (file) => {
  if (file === undefined) return undefined;
  if (path.extname(file) === ".yml" || path.extname(file) === ".yaml")
    return true;
  return false;
};

const toDetermineFormatFile = (file) => {
  if (isJson(file)) return "json";
  if (isYaml(file)) return "yaml";
  return null;
};

export default (file) => {
  const format = toDetermineFormatFile(file);
  if (format === "json") return JSON.parse(readFileSync(file, "utf-8"));
  if (format === "yaml") return yaml.load(readFileSync(file, "utf-8"));
  return undefined;
};
