import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  TableBody,
  TableColumnType,
  TableHeader,
} from "react-bs-datatable";

import type { VehicleInventory } from "shared/types/vehicle-inventory-lookup-types";

const HEADERS: Array<TableColumnType<VehicleInventory>> = [
  { title: "VIN", prop: "vin", isSortable: true },
  { title: "Dealer", prop: "dealer", isFilterable: true, isSortable: true },
  { title: "Driving Distance", prop: "drivingDistance", isSortable: true },
  { title: "Year", prop: "year", isSortable: true },
  { title: "Model", prop: "model", isSortable: true },
  { title: "Trim", prop: "trim", isFilterable: true, isSortable: true },
  {
    title: "Transmission",
    prop: "transmission",
    isFilterable: true,
    isSortable: true,
  },
  {
    title: "Exterior Color",
    prop: "exteriorColor",
    isFilterable: true,
    isSortable: true,
  },
  {
    title: "Interior Color",
    prop: "interiorColor",
    isFilterable: true,
    isSortable: true,
  },
  { title: "# of Cars in Lot", prop: "numAvailable", isSortable: true },
];

type PropType = {
  vehicles: Array<VehicleInventory>;
};

export default function SearchResults({ vehicles }: PropType) {
  return (
    <Card style={{ marginTop: "12px" }}>
      <Card.Header>Results</Card.Header>
      <Card.Body>
        <DatatableWrapper
          body={vehicles}
          headers={HEADERS}
          paginationOptionsProps={{
            initialState: {
              rowsPerPage: 10,
              options: [10, 15, 20, 30],
            },
          }}
        >
          <Filter placeholder="Filter by" />
          <Table>
            <TableHeader />
            <TableBody />
          </Table>
          <div className="d-flex justify-content-end">
            <Pagination />
          </div>
        </DatatableWrapper>
      </Card.Body>
    </Card>
  );
}
