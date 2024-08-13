import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Template from "components/Template";
import type { MapFilterInput } from "components/csmaps/MapFilter";
import MapFilter, { DEFAULT_FILTER } from "components/csmaps/MapFilter";
import MapSection from "components/csmaps/MapSection";
import Statistics from "components/csmaps/Statistics";
import TutorialSection from "components/csmaps/TutorialSection";
import { GetServerSidePropsResult } from "next";
import { Website } from "shared/config/website-config";
import {
  getMapsAsync,
  getStatisticsAsync,
  getTutorialsAsync,
} from "shared/fetch/csmaps";
import {
  CsMapsDataMapper,
  type MapCategory,
  type MapItem,
  type MapTutorial,
  type Statistics as StatisticsType,
} from "shared/types/cs-map-types";

type PropType = {
  categories: Array<MapCategory>;
  currentPath?: string;
  maps: {
    [key: number]: Array<MapItem>;
  };
  showDraftPosts: boolean;
  statistics: StatisticsType;
  tutorials: Array<MapTutorial>;
};

function MapSectionContainer({
  categories,
  currentPath = "",
  maps,
  showDraftPosts,
  statistics,
  tutorials,
}: PropType) {
  const [filter, setFilter] = useState<MapFilterInput>(DEFAULT_FILTER);

  return (
    <>
      <Statistics statistics={statistics} />
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
  statistics,
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
        statistics={statistics}
        tutorials={tutorials}
      />
    </Template>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<PropType>
> {
  const [
    { categories: categoryEntities, maps },
    staticsticsEntity,
    { tutorials: tutorialEntities },
  ] = await Promise.all([
    getMapsAsync(),
    getStatisticsAsync(),
    getTutorialsAsync(),
  ]);

  const categories = categoryEntities.map((category) =>
    CsMapsDataMapper.toCategory(category)
  );
  const mapLookup = categories.reduce((result, category) => {
    const matches = maps
      .map((map) => CsMapsDataMapper.toMapItem(map))
      .filter((map) => map.categoryId === category.id);
    return {
      ...result,
      [category.id]: matches,
    };
  }, {});

  const statistics = CsMapsDataMapper.toStatistics(staticsticsEntity);

  const tutorials = tutorialEntities.map((tutorial) =>
    CsMapsDataMapper.toTutorial(tutorial)
  );
  const showDraftPosts = process.env.NODE_ENV === "development";

  return {
    props: {
      categories,
      maps: mapLookup,
      showDraftPosts,
      statistics,
      tutorials,
    },
  };
}
