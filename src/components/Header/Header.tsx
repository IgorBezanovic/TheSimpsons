import { useContext } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo_transparent.png";
import Container from "components/Container";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AuthContext from "context/user/auth.context";
import CartContext from "context/cart/cart.context";
import { Badge } from "@mui/material";
import WishlistContext from "context/wishlist/wishlist.context";

export const Header = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const wishlistCtx = useContext(WishlistContext);

  const openWishlist = () => {
    wishlistCtx.open();
  };

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.header_content}>
          <div className={styles.logo_wrapp}>
            <img src={logo} alt="logo" style={{ width: "50px" }} />
          </div>
          <nav>
            <ul className={styles.nav_items}>
              <Link to={"/"}>
                <li className={styles.nav_item}>Home</li>
              </Link>
            </ul>
          </nav>
          <div className="flex">
            <Badge badgeContent={wishlistCtx.totalItems} color="primary">
              <FavoriteBorderIcon
                className={styles.headerIcon}
                onClick={openWishlist}
              />
            </Badge>
            <Link to={"/cart"}>
              <Badge badgeContent={cartCtx.totalUniqueItems} color="primary">
                <ShoppingCartOutlinedIcon className={styles.headerIcon} />
              </Badge>
            </Link>
            {authCtx.isLoggedIn && (
              <Link to={"/profile"}>
                <AccountCircleOutlinedIcon className={styles.headerIcon} />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
