import type { GetStaticPropsResult } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import type { MapFilterInput } from "components/MapFilter";
import MapFilter, { DEFAULT_FILTER } from "components/MapFilter";
import MapSection from "components/MapSection";
import Template from "components/Template";
import TutorialSection from "components/TutorialSection";
import {
  mapCategories,
  mapItems,
  mapTutorials,
} from "shared/config/cs-map-config";
import { Website } from "shared/config/website-config";
import type { MapCategory, MapItem } from "shared/types/cs-map-types";

type PropType = {
  categories: Array<MapCategory>;
  currentPath?: string;
  maps: {
    [key: number]: Array<MapItem>;
  };
};

function MapSectionContainer({ categories, currentPath = "", maps }: PropType) {
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
        tutorials={mapTutorials}
      />
    </>
  );
}

export default function CsMaps({ categories, maps }: PropType) {
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
      />
    </Template>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<PropType>
> {
  const mapLookup = mapCategories.reduce((result, category) => {
    const matches = mapItems.filter((map) => map.categoryId === category.id);
    return {
      ...result,
      [category.id]: matches,
    };
  }, {});

  return {
    props: {
      categories: mapCategories,
      maps: mapLookup,
    },
  };
}
