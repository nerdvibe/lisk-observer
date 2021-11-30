import React from "react";
import { ListGroupItem } from "reactstrap";
import "./style.css";
import { DelegateLogo } from "../../modules/utils/logos/DelegateLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchResultProps {
  link?: string;
  address?: string;
  transaction?: string;
  id?: string;
  username?: string;
  path?: string;
  height?: string;
  isThemed?: boolean;
  empty?: boolean;
  type?: string;
}

export const SearchResult = ({
  link,
  address,
  transaction,
  id,
  username = "",
  path,
  height,
  isThemed = false,
  empty = false,
  type,
}: SearchResultProps) => {
  const whiteTheme = document.body.classList.contains("white-content");
  const icon = type === "block" ? "cube" : "exchange-alt";
  const resultImage = () => {
    if (!empty) {
      if (type === "account") {
        return (
          <DelegateLogo
            delegateName={username}
            address={address}
            className="tile-icon"
            generateRandom={true}
          />
        );
      } else {
        return (
          <FontAwesomeIcon
            icon={icon}
            className={`${isThemed && "themed-icon"} tile-icon`}
          />
        );
      }
    }
  };

  if (empty) {
    return (
      <ListGroupItem
        className={
          isThemed && !whiteTheme
            ? "themed-searchbox-list-group-item fast-fade-in"
            : "searchbox-list-group-item fast-fade-in"
        }
        active
        action
      >
        <div className="list-group-item-text color-black" key={0}>
          <div
            className={
              isThemed
                ? "themed-searchbox-list-group-text empty-tile"
                : "searchbox-list-group-text empty-tile"
            }
          >
            No results
          </div>
        </div>
      </ListGroupItem>
    );
  }

  return (
    <a href={!empty && `/${path}/${link}`}>
      <ListGroupItem
        className={
          isThemed && !whiteTheme
            ? "themed-searchbox-list-group-item fast-fade-in"
            : "searchbox-list-group-item fast-fade-in"
        }
        active
        action
      >
        <div className="list-group-item-text color-black" key={0}>
          {resultImage()}
          <span
            className={
              isThemed
                ? "themed-searchbox-list-group-text"
                : "searchbox-list-group-text"
            }
          >
            {username && (
              <div>
                Username :{" "}
                <div className="inline-strong-element">{username}</div>
              </div>
            )}
            {!username && type === "account" && (
              <div>
                <div className="inline-strong-element">Lisk account</div>
              </div>
            )}
            {address && (
              <div>
                Address : <div className="inline-strong-element">{address}</div>
              </div>
            )}
            {transaction && (
              <div>
                Transaction :{" "}
                <div className="inline-strong-element pt-10">{transaction}</div>
              </div>
            )}
            {id && (
              <div>
                ID : <div className="inline-strong-element">{id}</div>
              </div>
            )}
            {height && (
              <div>
                Height : <div className="inline-strong-element">{height}</div>
              </div>
            )}
          </span>
        </div>
      </ListGroupItem>
    </a>
  );
};
