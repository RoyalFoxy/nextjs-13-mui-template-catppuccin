import H from "@/components/content/H";
import P from "@/components/content/P";
import Link from "@/components/navigation/Link";

export default function NotFound() {
  return (
    <>
      <H large>404</H>
      <P>
        I&apos;m not sure how you got here - But I&apos;m sure it&apos;s your
        fault.
      </P>
      <P>
        Get back <Link href="/">Home</Link>.
      </P>
    </>
  );
}
