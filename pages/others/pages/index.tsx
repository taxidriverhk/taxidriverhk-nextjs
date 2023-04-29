import Link from "next/link";
import { useRouter } from "next/router";

import Template from "components/Template";
import { Website } from "shared/config/website-config";

export default function OthersPages() {
  const router = useRouter();
  const { asPath: currentPath } = router;
  return (
    <Template activeWebsite={Website.PERSONAL} path={currentPath}>
      <p>
        All other pages like tutorials, archives and anything interesting are
        listed below:
      </p>
      <ul>
        <li>Buses</li>
        <ul>
          <li>
            <Link href="/legacy/colorparadox/MotorCity/Speedway/8728/p_bus.html">
              Color Paradox - Jess&apos;s 66 Transport Photo Page (Directly
              Extracted from Geocities)
            </Link>
          </li>
        </ul>
        <li>Video Archives</li>
        <ul>
          <li>
            <Link href="/legacy/hketv">
              HKETV (香港教育電視) Videos Archive
            </Link>
          </li>
          <li>
            <Link href={`${currentPath}/apple-daily`}>
              Apple Daily (蘋果日報) Videos Archive (Mostly between 2019 and
              2021)
            </Link>
          </li>
        </ul>
        <li>Others</li>
        <ul>
          <li>
            <Link href="/legacy/wordpress">
              Extract of My Old Xanga Blog Entries (Password Required)
            </Link>
          </li>
        </ul>
      </ul>
    </Template>
  );
}
