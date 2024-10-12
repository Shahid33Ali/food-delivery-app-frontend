import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};
const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
  const pageArr = [];
  for (let i = 1; i <= pages; i++) {
    pageArr[i - 1] = i;
  }
  if (pageArr.length === 0) {
    return;
  }
  return (
    <Pagination>
      <PaginationContent>
        {page !== pageArr[0] && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(page - 1)}
            />
          </PaginationItem>
        )}
        {pageArr.map((currpage) => (
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(page)}
              isActive={page === currpage}
            >
              {currpage}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page !== pageArr.length && (
          <PaginationItem>
            <PaginationNext onClick={() => onPageChange(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
export default PaginationSelector;
