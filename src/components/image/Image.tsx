import ClientImage from "./ClientImage";
import { createHash } from "crypto";

interface Image {
  name: string;
  alt: string;
}

export default function Image({ name, alt }: Image) {
  const imageHash = createHash("md5").update(name).digest("hex");
  const blurredHash = createHash("md5").update(`${name}.blur`).digest("hex");

  return (
    <ClientImage
      name={imageHash}
      blurred={blurredHash}
      alt={alt}
    />
  );
}
