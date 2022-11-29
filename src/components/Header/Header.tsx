import { memo } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo_transparent.png";
import Container from "components/Container";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { isLoggedIn } from "context/user";

export const Header = () => {
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
              <Link to={"/example"}>
                <li className={styles.nav_item}>Example</li>
              </Link>
            </ul>
          </nav>
          <div className="flex">
            <FavoriteBorderIcon className={styles.headerIcon} />
            <ShoppingCartOutlinedIcon className={styles.headerIcon} />
            {isLoggedIn && (
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

export default memo(Header);
