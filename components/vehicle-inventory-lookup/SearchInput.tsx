import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { brands, models } from "shared/config/vehicle-inventory-config";
import type { VehicleInventorySearchQuery } from "shared/types/vehicle-inventory-lookup-types";
import { VehicleBrand } from "shared/types/vehicle-inventory-lookup-types";

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTONS = [CURRENT_YEAR + 1, CURRENT_YEAR, CURRENT_YEAR - 1];
const DEFAULT_BRAND = VehicleBrand.HONDA;
const DISABLED_BRANDS = new Set<VehicleBrand>([VehicleBrand.TOYOTA]);

type PropType = {
  hasValidationError: boolean;
  isDisabled?: boolean;
  query: VehicleInventorySearchQuery;
  onSubmit: (nextQuery: VehicleInventorySearchQuery) => void;
};

export default function SearchInput({
  hasValidationError,
  isDisabled = false,
  query: initialQuery,
  onSubmit,
}: PropType) {
  const [query, setQuery] = useState<VehicleInventorySearchQuery>(initialQuery);
  const { brand } = query;

  const handleTextInputChange = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery({
        ...query,
        [field]: e.currentTarget.value,
      });
    },
    [query, setQuery]
  );
  const handleSelectionChange = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      setQuery({
        ...query,
        [field]: e.currentTarget.value,
      });
    },
    [query, setQuery]
  );
  const handleOnSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(query);
    },
    [onSubmit, query]
  );

  const brandOptions = useMemo(() => Array.from(brands.entries()), []);
  const modelOptions = useMemo(
    () =>
      Array.from(
        models.get((query.brand as VehicleBrand) || DEFAULT_BRAND)?.values() ||
          []
      ),
    [query.brand]
  );

  useEffect(() => {
    setQuery({
      ...query,
      model: modelOptions[0][1],
    });
  }, [brand, modelOptions]);

  return (
    <Card>
      <Card.Header>Query</Card.Header>
      <Card.Body>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Year
            </Form.Label>
            <Col sm="10">
              <Form.Select
                onChange={handleSelectionChange("year")}
                value={query.year}
              >
                {YEAR_OPTONS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Brand
            </Form.Label>
            <Col sm="10">
              <Form.Select
                onChange={handleSelectionChange("brand")}
                value={query.brand}
              >
                {brandOptions.map(([brandKey, brandLabel]) => (
                  <option
                    key={brandKey}
                    value={brandKey}
                    disabled={DISABLED_BRANDS.has(brandKey)}
                  >
                    {`${brandLabel}${
                      DISABLED_BRANDS.has(brandKey) ? " [Disabled]" : ""
                    }`}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Model
            </Form.Label>
            <Col sm="10">
              <Form.Select
                onChange={handleSelectionChange("model")}
                value={query.model}
              >
                {modelOptions.map((model) => (
                  <option key={model[1]} value={model[1]}>
                    {model[0]}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Zip Code
            </Form.Label>
            <Col sm="10">
              <Form.Control
                isInvalid={hasValidationError}
                onChange={handleTextInputChange("zipCode")}
                type="number"
                value={query.zipCode}
              />
              <Form.Control.Feedback type="invalid">
                Zip code must be provided
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Max Dealers
            </Form.Label>
            <Col sm="10">
              <Form.Control
                isInvalid={hasValidationError}
                onChange={handleTextInputChange("maxDealers")}
                type="number"
                value={query.maxDealers}
              />
              <Form.Control.Feedback type="invalid">
                Max dealers must be provided
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Button disabled={isDisabled} type="submit">
            Search Inventory
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
