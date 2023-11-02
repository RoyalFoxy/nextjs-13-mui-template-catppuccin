import UAParser from "ua-parser-js";

export default function IsMobile() {
  return !!new UAParser().getDevice().type;
}
