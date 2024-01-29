import hash from "@/utils/hash";
import ClientImage from "@image/ClientImage";

interface Image {
  name: string;
  alt: string;
}

export default function Image({ name, alt }: Image) {
  const imageHash = hash(name);
  const blurredHash = hash(`${name}.blur`);

  return (
    <ClientImage
      name={imageHash}
      blurred={blurredHash}
      alt={alt}
    />
  );
}
