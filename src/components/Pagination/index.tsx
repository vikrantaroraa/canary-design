import styles from "./index.module.css";

interface PaginationProps {
  products: unknown[];
  page: number;
  setPage: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination = ({
  products,
  page,
  setPage,
  maxVisiblePages = 5,
}: PaginationProps) => {
  const totalPages = Math.ceil(products.length / 10);

  const selectPageHandler = (selectedPage: number) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  const renderPageNumberTile = (
    currentPage: number | string,
    key: number | string
  ) => {
    return (
      <span
        key={key}
        className={`${styles["page-number-tile"]} ${
          page === currentPage ? styles["selected-page"] : ""
        }`}
        onClick={() =>
          typeof currentPage === "number" && selectPageHandler(currentPage)
        }
      >
        {currentPage}
      </span>
    );
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageNumberTile(i, i));
      }
    } else {
      // The startPage and endPage calculates the range of page number tiles that will be displayed in the center, keeping the page tile the user is at in the middle.
      // ex-1:- If totalPages = 20, maxVisiblePages = 5, page = 12, then startPage = 10 and endPage = 14 then middle page number tiles will be 10, 11, 12, 13, 14. See how the page the user was on i.e., 12 is exactlty in the middle of the range
      // ex-1:- If totalPages = 20, maxVisiblePages = 8, page = 10, then startPage = 6 and endPage = 13 then middle page number tiles will be 6, 7, 8, 9, 10, 11, 12, 13. See how the page the user was on i.e., 10 is exactlty in the middle of the range
      const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        if (startPage > 2) {
          pageNumbers.push(renderPageNumberTile(1, 1));
        }
        pageNumbers.push(renderPageNumberTile("...", "starting-ellipsis"));
      }

      // generating tiles for the page number range between startPage and endPage both inclusive (i.e., the startPage & endPage are also part of the range)
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(renderPageNumberTile(i, i));
      }

      if (endPage < totalPages) {
        pageNumbers.push(renderPageNumberTile("...", "ending-ellipsis"));
        if (endPage < totalPages - 1) {
          pageNumbers.push(renderPageNumberTile(totalPages, totalPages));
        }
      }
    }

    return pageNumbers;
  };

  return (
    <div className={`${styles["pagination"]}`}>
      <span
        onClick={() => selectPageHandler(page - 1)}
        className={`${styles["page-number-tile"]} ${
          page > 1 ? "" : styles["hide-button"]
        }`}
      >
        ◀
      </span>
      {renderPageNumbers()}
      <span
        onClick={() => selectPageHandler(page + 1)}
        className={`${styles["page-number-tile"]} ${
          page < totalPages ? "" : styles["hide-button"]
        }`}
      >
        ▶
      </span>
    </div>
  );
};

export default Pagination;
