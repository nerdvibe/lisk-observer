import React, { useEffect, useState } from "react";
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Card,
  Label,
  CardBody,
  Form,
  ListGroup,
} from "reactstrap";
import { SearchResult } from "../navbar/SearchResult";
import debounce from "lodash/debounce";
import { hasNoResults } from "../navbar/Helper";
import { useSearchboxQuery } from "../../generated/graphql";

export const SearchCard = () => {
  const [focused, setFocused] = useState("");
  const [searchTxt, setSearchTxt] = useState("");
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

  const onChange = debounce(setSearchTxt, 500);

  const onFocus = () => setFocused("input-group-focus");
  const onBlur = () => setFocused("");
  const onEnter = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (searchboxLoading) {
      setShowLoader(searchboxLoading);
    } else {
      setTimeout(() => setShowLoader(searchboxLoading), 500);
    }
  }, [searchboxLoading]);

  return (
    <>
      <Card>
        <CardBody>
          <Label className="control-label">Search</Label>
          <Form onSubmitCapture={onEnter}>
            {showLoader && (
              <i className="app-icons icon-refresh-02 spin-animation-left" />
            )}
            <InputGroup className={focused} onSubmit={onEnter}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-search" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="Search an address, delegate, transaction or block"
                name="search"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.value)}
              />
            </InputGroup>
            <ListGroup className="searchbox-list-group">
              {searchboxResult?.search?.blocks?.map((el: any, index: any) => {
                return (
                  <SearchResult
                    path="block"
                    link={el.id}
                    id={el.id}
                    height={el.height}
                    isThemed={true}
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
                    isThemed={true}
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
                      isThemed={true}
                      key={index}
                      type="transaction"
                    />
                  );
                }
              )}
              {!searchboxLoading &&
                hasNoResults(searchboxResult, searchTxt) && (
                  <SearchResult isThemed={true} empty={true} key={-1} />
                )}
            </ListGroup>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};
