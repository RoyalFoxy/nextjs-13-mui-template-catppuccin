import H from "@content/H";
import Link from "@navigation/Link";
import P from "@content/P";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: `This is the home page of my website`,
};

export default function Page() {
  return (
    <>
      <H>Home</H>
      <P>
        Lorem ipsum <Link href="/about">Dolor</Link>, sit amet consectetur
        adipisicing <Link href="/elit">elit</Link>. Mollitia autem aut odio
        dicta accusantium, ipsam alias dolore voluptatem temporibus cupiditate
        repudiandae animi minima corporis, architecto obcaecati perspiciatis
        recusandae et reprehenderit!
      </P>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      {/* <Link href="https://github.com/RoyalFoxy">RoyalFoxy</Link>
      <Link href="https://github.com/">Github</Link>
      <Link href="https://youtube.com/">Youtube</Link>
      <Link href="https://mui.com/">MUI</Link> */}
    </>
  );
}
