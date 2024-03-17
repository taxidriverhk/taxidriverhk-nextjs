import type { GetStaticPropsResult } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import type { MapFilterInput } from "components/MapFilter";
import MapFilter, { DEFAULT_FILTER } from "components/MapFilter";
import MapSection from "components/MapSection";
import Template from "components/Template";
import TutorialSection from "components/TutorialSection";
import { Website } from "shared/config/website-config";
import { getMapsAsync, getTutorialsAsync } from "shared/fetch/csmaps";
import type {
  MapCategory,
  MapItem,
  MapTutorial,
} from "shared/types/cs-map-types";

type PropType = {
  categories: Array<MapCategory>;
  currentPath?: string;
  maps: {
    [key: number]: Array<MapItem>;
  };
  showDraftPosts: boolean;
  tutorials: Array<MapTutorial>;
};

function MapSectionContainer({
  categories,
  currentPath = "",
  maps,
  showDraftPosts,
  tutorials,
}: PropType) {
  const [filter, setFilter] = useState<MapFilterInput>(DEFAULT_FILTER);

  return (
    <>
      <MapFilter filter={filter} onFilter={setFilter} />
      {categories.map((category) => (
        <MapSection
          key={category.id}
          basePath={currentPath}
          category={category}
          filter={filter}
          maps={maps[category.id]}
        />
      ))}
      <TutorialSection
        basePath={currentPath}
        filter={filter}
        tutorials={tutorials}
        showDraftPosts={showDraftPosts}
      />
    </>
  );
}

export default function CsMaps({
  categories,
  maps,
  showDraftPosts,
  tutorials,
}: PropType) {
  const router = useRouter();
  const { asPath: path, pathname: currentPath, query } = router;

  useEffect(() => {
    const id = query.id;
    if (id != null) {
      router.push(`${currentPath}/maps/${id}`);
    }
  });

  return (
    <Template activeWebsite={Website.CSMAPS} path={path}>
      <MapSectionContainer
        categories={categories}
        currentPath={currentPath}
        maps={maps}
        showDraftPosts={showDraftPosts}
        tutorials={tutorials}
      />
    </Template>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<PropType>
> {
  const [{ categories, maps }, tutorials] = await Promise.all([
    getMapsAsync(),
    getTutorialsAsync(),
  ]);

  const mapLookup = categories.reduce((result, category) => {
    const matches = maps.filter((map) => map.categoryId === category.id);
    return {
      ...result,
      [category.id]: matches,
    };
  }, {});
  const showDraftPosts = process.env.NODE_ENV === "development";

  return {
    props: {
      categories,
      maps: mapLookup,
      showDraftPosts,
      tutorials,
    },
  };
}
