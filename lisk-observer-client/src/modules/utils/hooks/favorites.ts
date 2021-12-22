import { FAVORITE } from "./../const";
import { FavoriteAccount } from "./../hooks";
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
