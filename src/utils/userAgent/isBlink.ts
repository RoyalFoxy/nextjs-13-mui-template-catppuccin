import UAParser from "ua-parser-js";

export default function IsBlink() {
  return new UAParser().getEngine().name === "Blink";
}
