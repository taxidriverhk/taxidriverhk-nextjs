import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { NextIntlProvider, useIntl, useTranslations } from "next-intl";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

import type { PhotoCardPropType } from "components/hkadbus2/PhotoCard";
import PhotoCardList from "components/hkadbus2/PhotoCardList";
import QuickSearchCard from "components/hkadbus2/QuickSearchCard";
import Template from "components/hkadbus2/Template";
import { fetchSearchPhotos } from "shared/fetch/hkadbus2";
import useLocalizedStrings from "shared/hooks/useLocalizedStrings";
import { removeUndefinedAndLowercaseValues } from "shared/query/hkadbus2-query-builder";
import type {
  SearchPhotoQuery,
  SearchPhotoResult,
} from "shared/types/hkadbus2-types";
import { SortOrder } from "shared/types/hkadbus2-types";

type TemplateContainerPropType = {
  children: React.ReactNode;
};

type PropType = {
  recentPhotos: Array<SearchPhotoResult>;
};

const RECENT_PHOTOS_COUNT = 8;

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
    <>
      <Head>
        <title>{t("title")}</title>
      </Head>
      <Template
        linkAs={Link}
        locale={locale}
        onLocaleChange={(nextLocale) =>
          router.push({ pathname, query }, asPath, { locale: nextLocale })
        }
        translationFunc={t}
      >
        {children}
      </Template>
    </>
  );
}

function HKAdBus2HomeBody({ recentPhotos }: PropType) {
  const t = useTranslations("hkadbus2");
  const intl = useIntl();
  const router = useRouter();
  const { asPath, pathname } = router;

  const photoCards: Array<PhotoCardPropType> = useMemo(
    () =>
      recentPhotos.map(
        ({
          fleetPrefix,
          fleetNumber,
          licensePlateNumber,
          photoId,
          thumbnail,
          uploadedDate,
          username,
        }) => ({
          href: `${asPath}/photos/${photoId}`,
          photo: thumbnail,
          title: `${fleetPrefix}${fleetNumber}`,
          subtitle: licensePlateNumber,
          extra: t("uploaded-by-with-date", {
            username,
            relativeUploadedDate: intl.formatRelativeTime(
              uploadedDate,
              new Date()
            ),
          }),
        })
      ),
    [asPath, intl, recentPhotos, t]
  );

  const handleSearchCallback = useCallback(
    (keyword: string) => {
      const searchQuery: SearchPhotoQuery = removeUndefinedAndLowercaseValues({
        q: keyword,
      });
      router.push({
        pathname: `${pathname}/search`,
        query: searchQuery,
      });
    },
    [pathname, router]
  );

  return (
    <>
      <h3>{t("introduction-title")}</h3>
      <p>{t("introduction-body")}</p>
      <h3>{t("search-small-filter-title")}</h3>
      <QuickSearchCard onSearch={handleSearchCallback} translationFunc={t} />
      <h3>{t("recent-updates")}</h3>
      <PhotoCardList photos={photoCards} />
    </>
  );
}

export default function HKAdbus2Home({ recentPhotos }: PropType) {
  return (
    <HKAdBus2TemplateContainer>
      <HKAdBus2HomeBody recentPhotos={recentPhotos} />
    </HKAdBus2TemplateContainer>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PropType>> {
  const { locale } = context;
  const photoSearchQuery: SearchPhotoQuery = {};
  const { results } = await fetchSearchPhotos(
    photoSearchQuery,
    "uploadedDate",
    SortOrder.DESC,
    locale,
    undefined,
    RECENT_PHOTOS_COUNT
  );

  return {
    props: {
      recentPhotos: results,
    },
  };
}
