import { Button } from "reactstrap";
import React from "react";

interface Props {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({ page, totalPages, setPage }) => {
  const onClickSetPage = (page: number) => setPage(page);

  const isActive = (num: number) => {
    return num === page ? "btn-secondary" : "navigation-link inactive-button";
  };
  return (
    <nav className="" aria-label="pagination">
      <ul className="pagination">
        {page > 1 ? (
          <li className="page-item">
            <Button
              onClick={() => onClickSetPage(1)}
              aria-label="Previous"
              className="navigation-link  inactive-button"
            >
              <span aria-hidden="true">
                <i
                  aria-hidden="true"
                  className="app-icons icon-double-left"
                ></i>
              </span>
            </Button>
          </li>
        ) : null}
        {page > 2 ? (
          <li className="page-item">
            <Button
              onClick={() => onClickSetPage(page - 2)}
              className={`navigation-item ${isActive(page - 2)}`}
            >
              {page - 2}
            </Button>
          </li>
        ) : null}
        {page > 1 ? (
          <li className="page-item">
            <Button
              onClick={() => onClickSetPage(page - 1)}
              className={`navigation-item ${isActive(page - 1)}`}
            >
              {page - 1}
            </Button>
          </li>
        ) : null}
        <li className="active page-item">
          <Button
            onClick={() => onClickSetPage(page)}
            className={`navigation-item ${isActive(page)}`}
          >
            {page}
          </Button>
        </li>
        {page < totalPages ? (
          <li className="page-item">
            <Button
              onClick={() => onClickSetPage(page + 1)}
              className={`navigation-item ${isActive(page + 1)}`}
            >
              {page + 1}
            </Button>
          </li>
        ) : null}
        {page < totalPages - 1 ? (
          <li className="page-item">
            <Button
              onClick={() => onClickSetPage(page + 2)}
              className={`navigation-item ${isActive(page + 2)}`}
            >
              {page + 2}
            </Button>
          </li>
        ) : null}
        {page !== totalPages ? (
          <li className="page-item">
            <Button
              onClick={() => onClickSetPage(totalPages)}
              aria-label="Next"
              className={`navigation-item ${isActive(totalPages)}`}
            >
              <span aria-hidden="true">
                <i
                  aria-hidden="true"
                  className="app-icons icon-double-right"
                ></i>
              </span>
            </Button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};
