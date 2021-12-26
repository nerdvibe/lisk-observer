import React, { RefObject, useEffect, useRef, useState } from "react";
import "./style.css";

// reactstrap components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FavoriteAccount } from "../../modules/utils/hooks";
import { useFavoriteList } from "../../modules/utils/hooks/favorites";
import { truncateMidString } from "../../modules/utils/strings/strings";
import { Link } from "react-router-dom";
import {
  AvatarSize,
  DelegateLogo,
} from "../../modules/utils/logos/DelegateLogo";

export const FavoritePlugin: React.FC = () => {
  const menuRef = useRef(null);
  const [favorites, setFavoriteList] = useState([]);
  const [classes, setClasses] = useState("dropdown show-dropdown");
  const { favoriteList } = useFavoriteList();

  useEffect(() => {
    if (JSON.stringify(favoriteList) !== JSON.stringify(favorites)) {
      setFavoriteList(favoriteList);
    }
  });

  /**
   * Hook that alerts clicks outside of the passed ref
   */
  const useOutsideAlerter = (ref: RefObject<HTMLDivElement>) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          document.getElementsByClassName("show-dropdown")[1].className =
            "dropdown show-dropdown";
          setClasses("dropdown show-dropdown");
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const handleClick = () => {
    if (classes === "dropdown show-dropdown") {
      setClasses("dropdown show-dropdown show");
    } else {
      setClasses("dropdown show-dropdown");
    }
  };

  useOutsideAlerter(menuRef);

  return (
    <div
      className="fixed-plugin favorite-plugin border-radius-10"
      ref={menuRef}
    >
      <div className={classes}>
        <div onClick={handleClick}>
          <FontAwesomeIcon
            id="favorite-list-icon"
            className={`fixed-plugin-icon`}
            icon={"bookmark"}
          />
        </div>
        <div className="dropdown-menu show">
          <p className="header-title favorite-title">Favorite accounts</p>
          <ul className="favorite-list">
            {favorites.map(({ address, username }: FavoriteAccount) => {
              return (
                <li className="adjustments-line color-change currencies-line color-initial">
                  <Link to={`/account/${address}`}>
                    <span className="circle">
                      <DelegateLogo
                        delegateName={username || address}
                        address={address}
                        size={AvatarSize.SMALL}
                        className="mr-2 small-icon circle"
                      />
                    </span>
                    {truncateMidString(username || address, 20)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
