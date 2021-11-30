import React, { useEffect, useState } from "react";
import {
  Input as InputReactStrap,
  Modal as ModalReactStrap,
  Form,
  ListGroup,
} from "reactstrap";
import debounce from "lodash/debounce";
import { SearchResult } from "./SearchResult";
import { hasNoResults } from "./Helper";
import { useSearchboxQuery } from "../../generated/graphql";

interface Props {
  modalSearch: boolean;
  toggleModalSearch: () => void;
}

export const SearchModal: React.FC<Props> = ({
  modalSearch,
  toggleModalSearch,
}) => {
  const [searchTxt, setSearchTxt] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const {
    data: searchboxResult,
    loading: searchboxLoading,
  } = useSearchboxQuery({
    variables: {
      term: searchTxt,
    },
    skip: searchTxt === "",
  });

  const onEnter = (e: any) => {
    e.preventDefault();
  };

  const onChange = debounce(setSearchTxt, 500);

  useEffect(() => {
    if (searchboxLoading) {
      setShowLoader(searchboxLoading);
    } else {
      setTimeout(() => setShowLoader(searchboxLoading), 500);
    }
  }, [searchboxLoading]);

  useEffect(() => {
    if (!modalSearch) {
      setSearchTxt("");
    }
  }, [modalSearch]);

  return (
    <ModalReactStrap
      modalClassName="modal-search"
      isOpen={modalSearch}
      toggle={toggleModalSearch}
      autoFocus={false}
    >
      <div className="modal-header">
        {showLoader && (
          <i className="app-icons icon-refresh-02 spin-animation" />
        )}
        <Form onSubmitCapture={onEnter} className="w-100">
          <InputReactStrap
            id="inlineFormInputGroup"
            placeholder="Search by Address, delegate, transaction or block"
            type="text"
            onChange={(e) => onChange(e.target.value)}
            autoFocus={true}
          />
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggleModalSearch}
          >
            <i className="app-icons icon-simple-remove" />
          </button>
          <ListGroup className="search-list-group">
            {searchboxResult?.search?.blocks?.map((el: any, index: any) => {
              return (
                <SearchResult
                  path="block"
                  link={el.id}
                  id={el.id}
                  height={el.height}
                  key={index}
                  type="block"
                />
              );
            })}
            {searchboxResult?.search?.accounts?.map((el: any, index: any) => {
              return (
                <SearchResult
                  path="account"
                  link={el.address}
                  address={el.address}
                  username={el.username}
                  key={index}
                  type="account"
                />
              );
            })}
            {searchboxResult?.search?.transactions?.map(
              (el: any, index: any) => {
                return (
                  <SearchResult
                    path="transaction"
                    link={el.id}
                    transaction={el.id}
                    key={index}
                    type="transaction"
                  />
                );
              }
            )}
            {!searchboxLoading && hasNoResults(searchboxResult, searchTxt) && (
              <SearchResult isThemed={false} empty={true} key={-1} />
            )}
          </ListGroup>
        </Form>
      </div>
    </ModalReactStrap>
  );
};
