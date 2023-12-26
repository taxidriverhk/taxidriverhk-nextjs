import trim from "lodash/trim";
import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "components/hkadbus2/styles/SearchPhoto.module.css";
import { TypeaheadOptionType } from "shared/types/hkadbus2-types";
import SearchPhotoFormTypeahead from "./SearchPhotoFormTypeahead";

export type SearchPhotoFilterPropType = {
  keywords?: string;
  route?: string;
  fleetPrefix?: string;
  fleetNumber?: string;
  licensePlateNumber?: string;
  uploadedBy?: string;
};

export type TypeaheadOptions = {
  [entityType: string]: Array<string>;
};

type PropType = {
  filters: SearchPhotoFilterPropType;
  isFetching: boolean;
  onSearch: (nextFilters: SearchPhotoFilterPropType) => void;
  validationErrors: SearchPhotoFilterPropType;
  translationFunc: (key: string) => string;
  typeaheadOptions: TypeaheadOptions;
};

export default function SearchPhotoFilters({
  filters: initialFilters,
  onSearch,
  validationErrors,
  translationFunc: t,
  typeaheadOptions,
}: PropType) {
  const [filters, setFilters] =
    useState<SearchPhotoFilterPropType>(initialFilters);

  useEffect(() => setFilters(initialFilters), [initialFilters]);

  const handleOnChange = useCallback(
    (field: string) => (nextValue: string | null) => {
      setFilters({
        ...filters,
        [field]: nextValue != null ? trim(nextValue) : null,
      });
    },
    [filters, setFilters]
  );
  const handleOnTextInputChange = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      handleOnChange(field)(e.currentTarget.value),
    [handleOnChange]
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
              onChange={handleOnTextInputChange("keywords")}
              type="text"
              value={filters.keywords || ""}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.keywords}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("search-filter-route")}</Form.Label>
            <SearchPhotoFormTypeahead
              customOnChangePreprocessor={getBusRouteNumberFromOption}
              customValueFunc={buildBusRouteNumberWithCompanyName}
              entityType={TypeaheadOptionType.ROUTE}
              onChange={handleOnChange("route")}
              options={typeaheadOptions[TypeaheadOptionType.ROUTE]}
              selectedOption={filters.route}
              uppercase
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.route}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Label>{t("search-filter-fleet-number-group")}</Form.Label>
          <InputGroup>
            <InputGroup.Text>{t("search-filter-fleet-prefix")}</InputGroup.Text>
            <Form.Control
              className={styles["search-photo-input-uppercase"]}
              isInvalid={validationErrors.fleetPrefix != null}
              onChange={handleOnTextInputChange("fleetPrefix")}
              type="text"
              value={filters.fleetPrefix || ""}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.fleetPrefix}
            </Form.Control.Feedback>
            <InputGroup.Text>{t("search-filter-fleet-number")}</InputGroup.Text>
            <Form.Control
              onChange={handleOnTextInputChange("fleetNumber")}
              type="number"
              value={filters.fleetNumber || ""}
            />
          </InputGroup>
          <Form.Group>
            <Form.Label>{t("search-filter-license-plate-number")}</Form.Label>
            <SearchPhotoFormTypeahead
              entityType={TypeaheadOptionType.LICENSE_PLATE_NUMBER}
              onChange={handleOnChange("licensePlateNumber")}
              options={
                typeaheadOptions[TypeaheadOptionType.LICENSE_PLATE_NUMBER]
              }
              selectedOption={filters.licensePlateNumber}
              uppercase
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("search-filter-uploaded-by")}</Form.Label>
            <Form.Control
              onChange={handleOnTextInputChange("uploadedBy")}
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

function buildBusRouteNumberWithCompanyName(busRouteHashkey: string): string {
  const busRouteTokens = busRouteHashkey.split("-");
  const busRouteNumber =
    busRouteTokens[busRouteTokens.length - 1].toUpperCase();
  if (busRouteTokens.length === 1) {
    return busRouteNumber;
  }

  const busCompanyName = busRouteTokens[0];
  if (busCompanyName.startsWith("cross")) {
    return `${busRouteNumber} (Cross Harbour)`;
  }
  return `${busRouteNumber} (${busCompanyName.toUpperCase()})`;
}

function getBusRouteNumberFromOption(busRouteOption: string): string {
  const busRouteTokens = busRouteOption.split("-");
  return busRouteTokens[busRouteTokens.length - 1];
}
