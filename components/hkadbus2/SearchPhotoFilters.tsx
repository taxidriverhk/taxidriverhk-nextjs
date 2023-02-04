import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "components/hkadbus2/styles/SearchPhoto.module.css";

export type SearchPhotoFilterPropType = {
  keywords?: string;
  route?: string;
  fleetPrefix?: string;
  fleetNumber?: string;
  licensePlateNumber?: string;
  uploadedBy?: string;
};

type PropType = {
  filters: SearchPhotoFilterPropType;
  isFetching: boolean;
  onSearch: (nextFilters: SearchPhotoFilterPropType) => void;
  validationErrors: SearchPhotoFilterPropType;
  translationFunc: (key: string) => string;
};

export default function SearchPhotoFilters({
  filters: initialFilters,
  onSearch,
  validationErrors,
  translationFunc: t,
}: PropType) {
  const [filters, setFilters] =
    useState<SearchPhotoFilterPropType>(initialFilters);

  useEffect(() => setFilters(initialFilters), [initialFilters]);

  const handleOnChange = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({
        ...filters,
        [field]: e.currentTarget.value,
      });
    },
    [filters, setFilters]
  );
  const handleOnSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <Card bg="light" className={styles["search-photo-filter-container"]}>
      <Card.Body>
        <Form onSubmit={handleOnSearch}>
          <Form.Group>
            <Form.Label>{t("search-filter-keywords")}</Form.Label>
            <Form.Control
              isInvalid={validationErrors.keywords != null}
              onChange={handleOnChange("keywords")}
              type="text"
              value={filters.keywords || ""}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.keywords}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("search-filter-route")}</Form.Label>
            <Form.Control
              isInvalid={validationErrors.route != null}
              onChange={handleOnChange("route")}
              type="text"
              value={filters.route || ""}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.route}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Label>{t("search-filter-fleet-number-group")}</Form.Label>
          <InputGroup>
            <InputGroup.Text>{t("search-filter-fleet-prefix")}</InputGroup.Text>
            <Form.Control
              isInvalid={validationErrors.fleetPrefix != null}
              onChange={handleOnChange("fleetPrefix")}
              placeholder="(e.g. 3AV)"
              type="text"
              value={filters.fleetPrefix || ""}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.fleetPrefix}
            </Form.Control.Feedback>
            <InputGroup.Text>{t("search-filter-fleet-number")}</InputGroup.Text>
            <Form.Control
              placeholder="(e.g. 102)"
              onChange={handleOnChange("fleetNumber")}
              type="number"
              value={filters.fleetNumber || ""}
            />
          </InputGroup>
          <Form.Group>
            <Form.Label>{t("search-filter-license-plate-number")}</Form.Label>
            <Form.Control
              isInvalid={validationErrors.licensePlateNumber != null}
              onChange={handleOnChange("licensePlateNumber")}
              type="text"
              value={filters.licensePlateNumber || ""}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.licensePlateNumber}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("search-filter-uploaded-by")}</Form.Label>
            <Form.Control
              onChange={handleOnChange("uploadedBy")}
              type="text"
              value={filters.uploadedBy || ""}
            />
          </Form.Group>
          <div className={styles["search-photo-filter-button-container"]}>
            <Button
              className={styles["search-photo-filter-button"]}
              type="submit"
            >
              {t("search-filter-submit")}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
