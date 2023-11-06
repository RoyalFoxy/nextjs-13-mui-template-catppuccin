import H from "@content/H";
import Link from "@navigation/Link";
import { Metadata } from "next";
import P from "@content/P";
import Span from "@content/Span";

export const metadata: Metadata = {
  title: "Not Found",
  description: "I'm not sure how you got here - But I'm sure it's your fault",
};

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
        <Span
          color="error"
          bold>
          your fault.
        </Span>
      </P>
      <P>
        Get back <Link href="/">Home</Link>.
      </P>
    </>
  );
}
