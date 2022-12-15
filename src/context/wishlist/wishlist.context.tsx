import { productType } from "common/types/Product.type";
import { Wishlist } from "common/types/Wishlist.type";
import { createContext, useState } from "react";

const EMPTY_WISHLIST: Wishlist = {
  id: 1,
  userId: 1,
  products: [],
};

const WishlistContext = createContext({
  isOpen: false,
  wishlist: EMPTY_WISHLIST,
  totalItems: 0,
  open: () => {},
  close: () => {},
  addToWishlist: (item: productType) => {},
  removeFromWishlist: (itemId: number) => {},
  setInitValues: () => {},
});

export const WishlistContextProvider = (props: any) => {
  const [wishlist, setWishlist] = useState<Wishlist>(EMPTY_WISHLIST);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState<number>(0);

  const setInitValues = () => {
    initialWishlist();
    calcNumberOfItems();
  };

  const initialWishlist = () => {
    setWishlist(() => {
      const lsWishlist = localStorage.getItem("wishlist");

      if (lsWishlist) {
        const wishlist: Wishlist = JSON.parse(lsWishlist);

        if (
          Boolean(wishlist.id) &&
          Boolean(wishlist.userId) &&
          Boolean(wishlist.products)
        ) {
          return wishlist;
        } else {
          return EMPTY_WISHLIST;
        }
      } else {
        return EMPTY_WISHLIST;
      }
    });
  };

  const addToWishlist = (item: productType) => {
    setWishlist((prevWishlist) => {
      const lsWishlist = localStorage.getItem("wishlist");

      if (lsWishlist) {
        const wishlist: Wishlist = JSON.parse(lsWishlist);

        if (wishlist.products.length === 0) {
          wishlist.products.push(item);
        } else {
          const product = wishlist.products.find((p) => p.id === item.id);

          if (product) {
            return prevWishlist;
          } else {
            wishlist.products.push(item);
          }
        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        calcNumberOfItems();

        return wishlist;
      } else {
        prevWishlist.products.push(item);
        localStorage.setItem("wishlist", JSON.stringify(prevWishlist));
        calcNumberOfItems();

        return prevWishlist;
      }
    });
  };

  const removeFromWishlist = (itemId: number) => {
    setWishlist((prevWishlist) => {
      const lsWishlist = localStorage.getItem("wishlist");

      if (lsWishlist) {
        const wishlist: Wishlist = JSON.parse(lsWishlist);

        const index = wishlist.products.findIndex((p) => p.id === itemId);

        wishlist.products.splice(index, 1);

        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        calcNumberOfItems();

        return wishlist;
      } else {
        localStorage.setItem("wishlist", JSON.stringify(prevWishlist));
        calcNumberOfItems();

        return prevWishlist;
      }
    });
  };

  const calcNumberOfItems = () => {
    const lsWishlist = localStorage.getItem("wishlist");

    if (lsWishlist) {
      const wishlist: Wishlist = JSON.parse(lsWishlist);
      const total = wishlist.products.length;
      setTotalItems(total);
    }
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <WishlistContext.Provider
      value={{
        isOpen,
        wishlist,
        totalItems,
        open,
        close,
        addToWishlist,
        removeFromWishlist,
        setInitValues,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
