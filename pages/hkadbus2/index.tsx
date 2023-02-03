import { NextIntlProvider, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import ListGroup from "react-bootstrap/ListGroup";

import Template from "components/hkadbus2/Template";
import useLocalizedStrings from "shared/hooks/useLocalizedStrings";

type TemplateContainerPropType = {
  children: React.ReactNode;
};

export function HKAdBus2TemplateContainer({
  children,
}: TemplateContainerPropType) {
  const { locale } = useRouter();
  const strings = useLocalizedStrings(locale);

  return (
    <NextIntlProvider messages={strings}>
      <HKAdBus2TemplateLocalizedStringsRenderer>
        {children}
      </HKAdBus2TemplateLocalizedStringsRenderer>
    </NextIntlProvider>
  );
}

function HKAdBus2TemplateLocalizedStringsRenderer({
  children,
}: TemplateContainerPropType) {
  const t = useTranslations("hkadbus2");
  const router = useRouter();
  const { asPath, pathname, locale, query } = router;

  return (
    <Template
      busModelTitle={t("bus-models")}
      categoryTitle={t("categories")}
      path={asPath}
      linkAs={Link}
      locale={locale}
      onLocaleChange={(nextLocale) =>
        router.push({ pathname, query }, asPath, { locale: nextLocale })
      }
      title={t("title")}
    >
      {children}
    </Template>
  );
}

function HKAdBus2HomeBody() {
  const t = useTranslations("hkadbus2");
  return (
    <>
      <h3>{t("introduction-title")}</h3>
      <p>{t("introduction-body")}</p>
      <h3>{t("recent-updates")}</h3>
      <div>
        <ListGroup>
          <ListGroup.Item>{t("no-recent-updates")}</ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
}

export default function HKAdbus2Home() {
  return (
    <HKAdBus2TemplateContainer>
      <HKAdBus2HomeBody />
    </HKAdBus2TemplateContainer>
  );
}
