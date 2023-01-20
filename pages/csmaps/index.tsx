import type { GetStaticPropsResult } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Breadcrumb from "components/Breadcrumb";
import MapSection from "components/MapSection";
import Template from "components/Template";
import type { MapCategory, MapItem } from "shared/config/csMapData";
import { mapCategories, mapItems } from "shared/config/csMapData";

type PropType = {
  categories: Array<MapCategory>;
  maps: {
    [key: number]: Array<MapItem>;
  };
};

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
    <Template activeItemIndex={0}>
      <Breadcrumb path={path} />
      {categories.map((category) => (
        <MapSection
          key={category.id}
          basePath={currentPath}
          category={category}
          maps={maps[category.id]}
        />
      ))}
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
