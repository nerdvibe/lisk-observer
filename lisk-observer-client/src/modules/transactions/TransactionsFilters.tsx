import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { TX_TYPES, TX_TYPE_NAMES } from "../utils/const";

interface TransactionFilters {
  isOpen: boolean;
  TXType?: TX_TYPES;
  setTXType: (type: TX_TYPES) => void;
}

export default function TransactionsFilters({
  isOpen,
  TXType,
  setTXType,
}: TransactionFilters) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setShowDropdown(true);
      }, 100);
    } else {
      setShowDropdown(false);
    }
  }, [isOpen]);

  return (
    <div className={"filter-collapse"}>
      <Collapse isOpen={isOpen}>
        <div>
          <h4 className="mb-0">Transaction type : </h4>
          <Dropdown
            isOpen={openDropdown}
            toggle={() => setOpenDropdown(!openDropdown)}
            className=" bg-none"
          >
            <DropdownToggle caret>
              {TXType ? TX_TYPE_NAMES[TXType] : "All"}
              <FontAwesomeIcon
                icon={["fas", "angle-down"]}
                className="pointer float-right mt-1 ml-4 dropdown-icon"
              />
            </DropdownToggle>
            {showDropdown && (
              <DropdownMenu>
                <DropdownItem
                  className="pointer"
                  onClick={() => setTXType("" as TX_TYPES)}
                >
                  All
                </DropdownItem>
                {Object.values(TX_TYPES).map((type: TX_TYPES) => {
                  return (
                    <DropdownItem
                      className="pointer"
                      onClick={() => setTXType(type)}
                    >
                      {TX_TYPE_NAMES[type]}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            )}
          </Dropdown>
        </div>
      </Collapse>
    </div>
  );
}
