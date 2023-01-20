import { useRouter } from "next/router";

import Template from "components/Template";

export default function OthersPages() {
  const router = useRouter();
  const { asPath: currentPath } = router;
  return (
    <Template activeItemIndex={2} path={currentPath}>
      <p>
        All other pages like tutorials, archives and anything interesting are
        listed below:
      </p>
      <ul>
        <li>Buses</li>
        <ul>
          <li>
            <a href="legacy/colorparadox/MotorCity/Speedway/8728/p_bus.html">
              Color Paradox - Jess&apos;s 66 Transport Photo Page (Directly
              Extracted from Geocities)
            </a>
          </li>
        </ul>
        <li>Video Archives</li>
        <ul>
          <li>
            <a href="legacy/hketv">HKETV (香港教育電視) Videos Archive</a>
          </li>
          <li>
            <a href={`${currentPath}/apple-daily`}>
              Apple Daily (蘋果日報) Videos Archive (Mostly between 2019 and
              2021)
            </a>
          </li>
        </ul>
        <li>Others</li>
        <ul>
          <li>
            <a href="legacy/wordpress">
              Extract of My Old Xanga Blog Entries (Password Required)
            </a>
          </li>
        </ul>
      </ul>
    </Template>
  );
}
