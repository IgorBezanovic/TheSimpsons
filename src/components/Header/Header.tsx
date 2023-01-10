import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Container from 'components/Container';
import LanguageSelect from 'components/LanguageSelect';
import CartContext from 'context/cart/cart.context';
import UserContext from 'context/user/user.context';
import WishlistContext from 'context/wishlist/wishlist.context';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo_transparent.png';
import styles from './styles.module.css';

export const Header = () => {
  const userCtx = useContext(UserContext);
  const cartCtx = useContext(CartContext);
  const wishlistCtx = useContext(WishlistContext);

  const { t } = useTranslation();

  const openWishlist = () => {
    wishlistCtx.open();
  };

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.header_content}>
          <div className={styles.logo_wrapp}>
            <img src={logo} alt='logo' style={{ width: '50px' }} />
          </div>
          <nav>
            <ul className={styles.nav_items}>
              <Link to={'/'}>
                <li className={styles.nav_item}>{t('homePage')}</li>
              </Link>
            </ul>
          </nav>

          <div className={styles.header_content}>
            <LanguageSelect />
            <Tooltip title='Wishlist'>
              <Badge badgeContent={wishlistCtx.totalItems} color='primary'>
                <FavoriteBorderIcon
                  className={styles.headerIcon}
                  onClick={openWishlist}
                />
              </Badge>
            </Tooltip>
            <Link to={'/cart'}>
              <Tooltip title='Cart'>
                <Badge badgeContent={cartCtx.totalUniqueItems} color='primary'>
                  <ShoppingCartOutlinedIcon className={styles.headerIcon} />
                </Badge>
              </Tooltip>
            </Link>
            {userCtx.isLoggedIn ? (
              <Link to={'/profile'}>
                <Tooltip title='Profile'>
                  <AccountCircleOutlinedIcon className={styles.headerIcon} />
                </Tooltip>
              </Link>
            ) : (
              <Link to={'/login'}>
                <Tooltip title='Login'>
                  <LoginIcon className={styles.headerIcon} />
                </Tooltip>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
