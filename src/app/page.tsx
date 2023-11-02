import H from "@content/H";
import Link from "@navigation/Link";
import P from "@content/P";

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
      <Link href="https://github.com/RoyalFoxy">RoyalFoxy</Link>
      <Link href="https://github.com/">Github</Link>
      <Link href="https://youtube.com/">Youtube</Link>
      <Link href="https://mui.com/">MUI</Link>
    </>
  );
}
