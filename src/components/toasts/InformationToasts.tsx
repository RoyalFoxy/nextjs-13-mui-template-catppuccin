import { WEEK, fromToday } from "@/time";

import IsMobile from "../keyboard/isMobile";
import useCookies from "../cookies/useCookies";
import { useSnackbar } from "notistack";

interface InformationToast {
  name: string;
  description: string;
  noMobile: boolean;
  expires: number;
}

const information: InformationToast[] = [
  {
    name: "link.preview",
    description:
      "You can press $META when hovering over a link to get a small preview.",
    noMobile: true,
    expires: WEEK,
  },
];

export default function InformationToasts() {
  const { enqueueSnackbar } = useSnackbar();
  const [getCookie, setCookie] = useCookies();

  const isMobile = IsMobile();

  information.forEach(({ name, description, noMobile, expires }) => {
    if (noMobile && isMobile) return;

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
    });
  });

  return null;
}
