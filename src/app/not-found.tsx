import H from "@content/H";
import Link from "@navigation/Link";
import P from "@content/P";
import Span from "@content/Span";

export default function NotFound() {
  return (
    <>
      <H
        large
        color="error"
        underline>
        404
      </H>
      <P>
        I&apos;m not sure how you got here - But I&apos;m sure it&apos;s&nbsp;
        <Span color="error" bold>your fault.</Span>
      </P>
      <P>
        Get back <Link href="/">Home</Link>.
      </P>
    </>
  );
}
