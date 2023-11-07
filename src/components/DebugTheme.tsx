"use client";

import useTheme from "@useTheme";

export default function DebugTheme() {
  const theme = useTheme();
  return (
    <>
      <pre
        style={{ textAlign: "left", margin: "0 var(--margin)" }}
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(theme, null, 2)
            .replace(
              /"(#[0-9a-fA-F]{3,8})"/gm,
              `<span style="color: $1">$1</span>`
            )
            .replace(
              /"(rgba?\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}(, [0-9]\.[0-9]+)?\))"/gm,
              `<span style="color: $1">$1</span>`
            )
            .replace(
              /"([0-9]{1,3} [0-9]{1,3} [0-9]{1,3})"/gm,
              `<span style="color: rgb($1)">$1</span>`
            )
            .replace(
              /"(var\(--template-palette-.*\))"/gm,
              `<span style="color: $1">$1</span>`
            )
            .replace(
              /"(linear-gradient\(.*\))"/gm,
              `<span style="background: $1">$1</span>`
            ),
        }}
      />
    </>
  );
}
