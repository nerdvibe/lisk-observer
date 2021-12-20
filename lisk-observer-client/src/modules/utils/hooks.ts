import { FAVORITE } from "./const";
import { useState, useEffect } from "react";

export const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
};

export const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export interface FavoriteAccount {
  address: string;
  username?: string;
}

export const useFavoriteList = () => {
  const favoriteList = JSON.parse(localStorage.getItem(FAVORITE) || "[]");
  const isFavorite = (address: string) => {
    const favList = JSON.parse(localStorage.getItem(FAVORITE) || "[]");
    if (favList && favList.length > 0) {
      return (
        favList.findIndex(
          (favorite: FavoriteAccount) => favorite.address === address
        ) >= 0
      );
    }
    return false;
  };
  const pushFavorite = (address: string, username?: string) => {
    const favList = JSON.parse(localStorage.getItem(FAVORITE) || "[]");
    if (favList && favList.length > 0) {
      if (isFavorite(address)) {
        return;
      }
      favList.push({ address, username });
      return localStorage.setItem(FAVORITE, JSON.stringify(favList));
    }
    return localStorage.setItem(
      FAVORITE,
      JSON.stringify([{ address, username }])
    );
  };
  const deleteFavorite = (address: string) => {
    const favList = JSON.parse(localStorage.getItem(FAVORITE) || "[]");
    if (favList && favList.length > 0) {
      const favIndex = favList.findIndex(
        (favorite: FavoriteAccount) => favorite.address === address
      );
      if (favIndex >= 0) {
        const dataToSave = favoriteList.filter(
          (fav: FavoriteAccount) => fav.address !== address
        );
        localStorage.setItem(FAVORITE, JSON.stringify(dataToSave));
        return;
      }
      return localStorage.getItem(FAVORITE);
    }
    localStorage.setItem(FAVORITE, JSON.stringify([]));
    return;
  };

  return {
    favoriteList,
    pushFavorite,
    deleteFavorite,
    isFavorite,
  };
};
