import UAParser from "ua-parser-js";

const keyNames = {
  $META: {
    mac: "command",
    windows: "windows",
    linux: "meta",
  },
  $ALT: { mac: "option", windows: "alt", linux: "alt" },
} as const;

type Key = "mac" | "windows" | "linux" | "mobile";
export type KeyValue = string | null;

/**
 * Possible 'os.name'
 * AIX, Amiga OS, Android, Arch, Bada, BeOS, BlackBerry, CentOS, Chromium OS, Contiki,
 * Fedora, Firefox OS, FreeBSD, Debian, DragonFly, Gentoo, GNU, Haiku, Hurd, iOS,
 * Joli, Linpus, Linux, Mac OS, Mageia, Mandriva, MeeGo, Minix, Mint, Morph OS, NetBSD,
 * Nintendo, OpenBSD, OpenVMS, OS/2, Palm, PCLinuxOS, Plan9, Playstation, QNX, RedHat,
 * RIM Tablet OS, RISC OS, Sailfish, Series40, Slackware, Solaris, SUSE, Symbian, Tizen,
 * Ubuntu, UNIX, VectorLinux, WebOS, Windows [Phone/Mobile], Zenwalk
 */

export default function KeyNames() {
  let osKey: Key = "linux";

  let os = new UAParser().getOS();

  const result = new UAParser().getResult();

  if (result.device.type) osKey = "mobile";

  if (os.name === "Windows") osKey = "windows";
  if (os.name === "Mac OS") osKey = "mac";

  const map: { $META: KeyValue; $ALT: KeyValue } = { $META: null, $ALT: null };

  Object.keys(keyNames).forEach((_key) => {
    const key = _key as keyof typeof keyNames;
    if (osKey === "mobile") return;

    map[key] = keyNames[key][osKey];
  });

  return map;
}
