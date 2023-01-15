import type { GetStaticPropsResult } from "next";
import { useRouter } from "next/router";

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
  const currentPath = router.asPath;

  return (
    <Template activeItemIndex={0}>
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
