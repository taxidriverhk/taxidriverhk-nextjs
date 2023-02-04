import Button from "react-bootstrap/Button";

type PropType = {
  isFetching: boolean;
  isLoadMoreShown: boolean;
  onLoadMore: () => void;
  results: Array<any>;
};

export default function SearchPhotoResults({ onLoadMore, results }: PropType) {
  return (
    <>
      Search Photo Results<pre>{JSON.stringify(results, null, 2)}</pre>
      <Button onClick={onLoadMore}>Load More</Button>
    </>
  );
}
