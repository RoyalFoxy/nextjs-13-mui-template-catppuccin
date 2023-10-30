import { createHash } from "crypto";

export default function hash(toHash: string) {
  return createHash("md5").update(toHash).digest("hex");
}
