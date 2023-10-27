import H from "@/components/content/H";
import P from "@/components/content/P";
import Link from "@/components/navigation/Link";

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
    </>
  );
}
