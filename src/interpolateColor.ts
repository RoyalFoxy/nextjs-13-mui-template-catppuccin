const stringDigitToHex = (string: string) => digitToHex(parseInt(string));
const digitToHex = (d: number) => d.toString(16).padStart(2, "0");
const hexToDigit = (h: string) => parseInt(h, 16);

const rgbRegex =
  /^rgb\((?<red>[0-9]|[0-9]{2}|[01][0-9]{2}|2[0-4][0-9]|25[0-5]), (?<green>[0-9]|[0-9]{2}|[01][0-9]{2}|2[0-4][0-9]|25[0-5]), (?<blue>[0-9]|[0-9]{2}|[01][0-9]{2}|2[0-4][0-9]|25[0-5])\)$/;

export default function interpolateColor(
  color1: string,
  color2: string,
  factor: number = 0.5
) {
  const color1Matches = color1.match(rgbRegex);
  const color2Matches = color2.match(rgbRegex);

  if (color1Matches) {
    const { red, green, blue } = color1Matches.groups as {
      [key: string]: string;
    };

    const r = stringDigitToHex(red);
    const g = stringDigitToHex(green);
    const b = stringDigitToHex(blue);

    color1 = `#${r}${g}${b}`;
  }

  if (color2Matches) {
    const { red, green, blue } = color2Matches.groups as {
      [key: string]: string;
    };

    const r = stringDigitToHex(red);
    const g = stringDigitToHex(green);
    const b = stringDigitToHex(blue);

    color2 = `#${r}${g}${b}`;
  }

  let result = "#";
  for (let i = 1; i <= 6; i += 2) {
    let c1 = hexToDigit(color1.substring(i, i + 2));
    let c2 = hexToDigit(color2.substring(i, i + 2));
    let color = digitToHex(Math.round(c1 + factor * (c2 - c1)));
    result += color;
  }

  return result;
}
