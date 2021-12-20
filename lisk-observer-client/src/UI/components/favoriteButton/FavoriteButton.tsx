import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useFavoriteList } from "../../../modules/utils/hooks";
import "./style.css";

interface Props {
  address: string;
  disabled?: boolean;
  username?: string;
  alt?: boolean;
}

const FavoriteButton = ({ address, username, alt }: Props) => {
  const { pushFavorite, isFavorite, deleteFavorite } = useFavoriteList();
  const [isActive, setIsActive] = useState(isFavorite(address));
  const addToFavorite = (event: any) => {
    event.stopPropagation();
    if (isActive) {
      deleteFavorite(address);
    } else {
      pushFavorite(address, username);
      window.document
        .getElementById("favorite-list-icon")
        ?.classList.add("hithere");
      setTimeout(() => {
        window.document
          .getElementById("favorite-list-icon")
          ?.classList.remove("hithere");
      }, 1000);
    }
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (isFavorite(address) !== isActive) {
      setIsActive(!isActive);
    }
  });

  return address ? (
    <div
      className={
        alt ? "favorite-button-container-alt" : "favorite-button-container"
      }
      onClick={(e) => addToFavorite(e)}
    >
      {alt ? (
        <FontAwesomeIcon
          size="1x"
          icon={[isActive ? "fas" : "far", "heart"]}
          fill={isActive ? "none" : "white"}
        />
      ) : (
        <div className={`heart ${isActive ? "is-active" : ""}`} />
      )}
    </div>
  ) : (
    <></>
  );
};

export default FavoriteButton;
