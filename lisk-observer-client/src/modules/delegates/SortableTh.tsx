import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SortingTypes, TableColumns } from "./utils/sorting";

interface TableHeader {
  sortingType?: string;
  setSorting: (column: TableColumns, type: SortingTypes) => void;
  activeHeader: string;
  column: TableColumns;
  children?: React.ReactNode;
  className?: string;
  width?: string;
}

export const SortableTh = ({
  sortingType,
  setSorting,
  activeHeader,
  column,
  children,
  className,
  width,
}: TableHeader) => {
  const icon = sortingType === "desc" ? "caret-down" : "caret-up";
  const sortingButtonHandler = (sort?: SortingTypes) => {
    if (sort) {
      setSorting(column, sort);
    } else {
      const newSorting =
        sortingType === "desc" ? SortingTypes.ASC : SortingTypes.DESC;
      setSorting(column, newSorting);
    }
  };
  return activeHeader === column ? (
    <th
      className={`pointer ${className}`}
      onClick={() => sortingButtonHandler()}
      style={{ width }}
    >
      {children} <FontAwesomeIcon className="pointer" icon={icon} />
    </th>
  ) : (
    <th
      className={`pointer ${className}`}
      onClick={() => sortingButtonHandler(SortingTypes.DESC)}
      style={{ width }}
    >
      {children}{" "}
      <FontAwesomeIcon className="inactive-sorting" icon={"caret-down"} />
    </th>
  );
};
