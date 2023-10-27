import H from "@content/H";
import P from "@content/P";
import Span from "@content/Span";
import Link from "@navigation/Link";

export default function NotFound() {
  return (
    <>
      <H large color="error" underline>
        404
      </H>
      <P>
        I&apos;m not sure how you got here - But I&apos;m sure it&apos;s&nbsp;
        <Span color="error">your fault.</Span>
      </P>
      <P>
        Get back <Link href="/">Home</Link>.
      </P>
    </>
  );
}
