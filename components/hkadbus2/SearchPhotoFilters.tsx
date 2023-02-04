import { useCallback, useState } from "react";
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
};

export default function SearchPhotoFilters({
  filters: initialFilters,
  onSearch,
  validationErrors,
}: PropType) {
  const [filters, setFilters] = useState<SearchPhotoFilterType>(initialFilters);

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
            <Form.Label>Keywords (separate by commas or space)</Form.Label>
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
            <Form.Label>Route</Form.Label>
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
          <Form.Label>Fleet Number</Form.Label>
          <InputGroup>
            <InputGroup.Text>Prefix</InputGroup.Text>
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
            <InputGroup.Text>Number</InputGroup.Text>
            <Form.Control
              placeholder="(e.g. 102)"
              onChange={handleOnChange("fleetNumber")}
              type="number"
              value={filters.fleetNumber}
            />
          </InputGroup>
          <Form.Group>
            <Form.Label>License Plate Number</Form.Label>
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
            <Form.Label>Uplodaded By</Form.Label>
            <Form.Control
              onChange={handleOnChange("uploadedBy")}
              type="text"
              value={filters.uploadedBy}
            />
          </Form.Group>
        </Form>
        <Button onClick={handleOnSearch}>Search</Button>
      </Card.Body>
    </Card>
  );
}
