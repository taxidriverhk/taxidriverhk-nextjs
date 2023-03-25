import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "components/hkadbus2/styles/QuickSearch.module.css";

type QuickSearchPropType = {
  onSearch: (keyword: string) => void;
  translationFunc: (key: string) => string;
};

export default function QuickSearchCard({
  onSearch,
  translationFunc: t,
}: QuickSearchPropType) {
  const [keyword, setKeyword] = useState<string | null>(null);

  const handleOnSearch = (e: React.FormEvent<HTMLFormElement>) => {
    if (keyword != null) {
      e.preventDefault();
      onSearch(keyword);
    }
  };

  return (
    <Card bg="light">
      <Card.Body className={styles["quick-search-container"]}>
        <Form onSubmit={handleOnSearch}>
          <InputGroup>
            <Form.Control
              placeholder={t("search-small-filter-keyword")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setKeyword(e.currentTarget.value)
              }
              type="text"
              value={keyword || ""}
            />
            <Button variant="outline-primary" type="submit">
              {t("search-small-filter-submit")}
            </Button>
          </InputGroup>
        </Form>
      </Card.Body>
    </Card>
  );
}
