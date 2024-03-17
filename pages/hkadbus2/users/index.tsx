import UserList from "components/hkadbus2/UserList";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useTranslations } from "next-intl";

import { HKAdBus2TemplateContainer } from "pages/hkadbus2/index";
import { getUsersAsync } from "shared/fetch/hkadbus2";
import { buildPhotoSearchUrl } from "shared/query/hkadbus2-query-builder";
import { User } from "shared/types/hkadbus2-types";

type PropType = {
  users: Array<User>;
};

function HKAdbus2UsersBody({ users }: PropType) {
  const t = useTranslations("hkadbus2");
  const numOfUsers = users.length;

  return (
    <>
      <h3>{t("user-list-title")}</h3>
      <p>{t("user-list-intro", { numOfUsers })}</p>
      <UserList
        hrefFunc={(username: string) =>
          `${buildPhotoSearchUrl({ uploaderName: username })}`
        }
        users={users}
      />
    </>
  );
}

export default function HKAdbus2Users({ users }: PropType) {
  return (
    <HKAdBus2TemplateContainer>
      <HKAdbus2UsersBody users={users} />
    </HKAdBus2TemplateContainer>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PropType>> {
  const { users } = await getUsersAsync();
  const sortedUsers = users.sort((u1, u2) =>
    u1.username.localeCompare(u2.username)
  );

  return {
    props: {
      users: sortedUsers,
    },
  };
}
