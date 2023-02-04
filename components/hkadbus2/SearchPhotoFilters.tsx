import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export type SearchPhotoFilterType = {
  keywords?: string;
  route?: string;
  fleetPrefix?: string;
  fleetNumber?: string;
  licensePlateNumber?: string;
  uploadedBy?: string;
};

type PropType = {
  filters: SearchPhotoFilterType;
  isFetching: boolean;
  onSearch: (nextFilters: SearchPhotoFilterType) => void;
  validationErrors: SearchPhotoFilterType;
  translationFunc: (key: string) => string;
};

export default function SearchPhotoFilters({
  filters: initialFilters,
  onSearch,
  validationErrors,
  translationFunc: t,
}: PropType) {
  const [filters, setFilters] = useState<SearchPhotoFilterType>(initialFilters);

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
  const handleOnSearch = useCallback(() => {
    onSearch(filters);
  }, [filters, onSearch]);

  return (
    <Card bg="light">
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>{t("search-filter-keywords")}</Form.Label>
            <Form.Control
              isInvalid={validationErrors.keywords != null}
              onChange={handleOnChange("keywords")}
              type="text"
              value={filters.keywords}
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
              value={filters.route}
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
              value={filters.fleetPrefix}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.fleetPrefix}
            </Form.Control.Feedback>
            <InputGroup.Text>{t("search-filter-fleet-number")}</InputGroup.Text>
            <Form.Control
              placeholder="(e.g. 102)"
              onChange={handleOnChange("fleetNumber")}
              type="number"
              value={filters.fleetNumber}
            />
          </InputGroup>
          <Form.Group>
            <Form.Label>{t("search-filter-license-plate-number")}</Form.Label>
            <Form.Control
              isInvalid={validationErrors.licensePlateNumber != null}
              onChange={handleOnChange("licensePlateNumber")}
              type="text"
              value={filters.licensePlateNumber}
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
              value={filters.uploadedBy}
            />
          </Form.Group>
        </Form>
        <Button onClick={handleOnSearch}>{t("search-filter-submit")}</Button>
      </Card.Body>
    </Card>
  );
}
