import Button from "react-bootstrap/Button";

type PropType = {
  filters: any;
  isFetching: boolean;
  onSearch: (filters: any) => void;
};

export default function SearchPhotoFilters({ filters, onSearch }: PropType) {
  return (
    <>
      Search Photo Filters
      <pre>{JSON.stringify(filters, null, 2)}</pre>
      <Button onClick={onSearch}>Search</Button>
      <br />
    </>
  );
}
