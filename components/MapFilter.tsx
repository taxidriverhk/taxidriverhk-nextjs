import { useCallback } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Stack from "react-bootstrap/Stack";

import { GameVersion } from "shared/config/csMapData";

import styles from "components/styles/MapSection.module.css";

export type MapFilterInput = {
  versions: Array<GameVersion>;
  sort: string;
};

export const DEFAULT_FILTER = {
  versions: Object.values(GameVersion),
  sort: "releaseDate",
};

type PropType = {
  filter: MapFilterInput;
  onFilter: (nextFilter: MapFilterInput) => void;
};

export default function MapItem({
  filter: { versions, sort },
  onFilter,
}: PropType) {
  const handleOnChange = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      onFilter({
        ...{
          versions,
          sort,
        },
        [field]: Array.from(e.target.selectedOptions).map((item) => item.value),
      });
    },
    [versions, sort, onFilter]
  );

  return (
    <Card bg="light" border="dark" className={styles["section-container"]}>
      <Card.Body>
        <Stack direction="horizontal" gap={3}>
          <div>
            <InputGroup>
              <InputGroup.Text>Filter by Version(s)</InputGroup.Text>
              <Form.Select
                multiple
                onChange={handleOnChange("versions")}
                value={versions}
              >
                {Object.values(GameVersion).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </div>
          <div>
            <InputGroup>
              <InputGroup.Text>Sort by</InputGroup.Text>
              <Form.Select onChange={handleOnChange("sort")} value={sort}>
                <option value="releaseDate">Last Update Date</option>
                <option value="name">Map Name</option>
              </Form.Select>
            </InputGroup>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
}
