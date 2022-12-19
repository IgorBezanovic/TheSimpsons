import styles from "./styles.module.css";
import logo from "../../assets/images/LogoLevi.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import { footerItemsOne, footerItemsTwo } from "common/footer-items";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerColumn}>
        <img src={logo} alt="logo" width="200" />
      </div>

      <div className={styles.footerColumn}>
        {footerItemsOne.map((item, index) => (
          <a
            href={item.link}
            key={item.id + item.name}
            className={`${index === 0 ? styles.header : styles.text}`}
          >
            {t(item.name)}
          </a>
        ))}
      </div>

      <div className={styles.footerColumn}>
        {footerItemsTwo.map((item, index) => (
          <a
            href={item.link}
            key={item.id + item.name}
            className={`${index === 0 ? styles.header : styles.text}`}
          >
            {t(item.name)}
          </a>
        ))}
      </div>

      <div className={styles.socialIcons}>
        <a href="https://www.facebook.com/Levi9Serbia/">
          <FacebookIcon color="primary" />
        </a>
        <a href="https://twitter.com/levi9company">
          <TwitterIcon color="primary" />
        </a>
        <a href="https://www.youtube.com/channel/UC9hzwzLaoIqt6FBNJMJ7dYw">
          <YouTubeIcon color="primary" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
