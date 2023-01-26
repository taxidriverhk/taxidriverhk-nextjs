import { useRouter } from "next/router";

import Template from "components/hkadbus2/Template";

export default function HKAdbus2Home() {
  const router = useRouter();
  const { asPath: path } = router;
  return <Template path={path}>Home Page</Template>;
}
