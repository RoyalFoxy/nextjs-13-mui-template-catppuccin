import { BaseVariant, useSnackbar } from "notistack";
import { WEEK, fromToday } from "@time";

import IsBlink from "@utils/userAgent/isBlink";
import IsMobile from "@utils/userAgent/isMobile";
import useCookies from "@components/cookies/useCookies";
import { useEffect } from "react";

interface InformationToast {
  name: string;
  description: string;
  noMobile?: boolean;
  noBlink?: boolean;
  expires: number;
  variant?: BaseVariant;
}

const information: InformationToast[] = [
  {
    name: "link.preview",
    description:
      "You can press $META when hovering over a link to get a small preview.",
    noMobile: true,
    expires: WEEK,
  },
  {
    name: "non-chrome.dark-mode.missing-header",
    description: "Proper darkmode is only supported with blink based browsers.",
    noBlink: true,
    expires: WEEK,
    variant: "warning",
  },
];

export default function InformationToasts() {
  const { enqueueSnackbar } = useSnackbar();
  const [getCookie, setCookie] = useCookies();

  const isMobile = IsMobile();
  const isBlink = IsBlink();

  useEffect(() => {
    information.forEach(
      ({
        name,
        description,
        expires,
        noMobile = false,
        noBlink = false,
        variant = "info",
      }) => {
        if (noMobile && isMobile) return;
        if (noBlink && isBlink) return;

        const hasViewed = getCookie<boolean>(name);
        if (hasViewed) return;

        let message = description;

        enqueueSnackbar({
          message,
          persist: true,
          onClose: () => {
            setCookie<boolean>(name, true, {
              expires: fromToday(expires),
            });
          },
          hideIconVariant: false,
          variant,
        });
      }
    );
  }, [enqueueSnackbar, getCookie, isBlink, isMobile, setCookie]);

  return null;
}
