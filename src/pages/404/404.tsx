import { AppLayout } from 'components/Layouts';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <AppLayout>
      <div className={styles.login_page}>
        <h1 className={styles.title}>{t('pageNotFound')}</h1>
      </div>
    </AppLayout>
  );
};

export default NotFound;
