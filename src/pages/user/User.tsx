/* eslint-disable react-hooks/exhaustive-deps */
import Button from '@mui/material/Button';
import { User } from 'common/types/User.type';
import { AppLayout } from 'components/Layouts';
import LoadingContext from 'context/loading/loading.context';
import UserContext from 'context/user/user.context';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userService from 'services/user.service';
import styles from './styles.module.css';

const Profile = () => {
  const userCtx = useContext(UserContext);
  const loadingCtx = useContext(LoadingContext);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [user, setUser] = useState<User>();

  const fetchUserData = async (id: number) => {
    try {
      loadingCtx.show();
      const res = await userService.userProfile(id);

      userCtx.onProfileEnter(res.data);
      setUser(res.data);
      loadingCtx.hide();
    } catch (error) {
      loadingCtx.hide();
      toast.info(t('unableToFetchUser'));
    }
  };

  const logout = () => {
    userCtx.onLogout();
    navigate('/');
  };

  useEffect(() => {
    if (userCtx.user) {
      setUser(userCtx.user);
    } else {
      fetchUserData(userCtx.userId);
    }
  }, []);

  return (
    <AppLayout>
      {user && (
        <div className={styles.userProfile}>
          <img
            className={styles.profileImage}
            alt='ProfileImage'
            src='https://st4.depositphotos.com/1012074/25277/v/600/depositphotos_252773324-stock-illustration-young-avatar-face-with-sunglasses.jpg'
          ></img>
          <div className={styles.userData}>
            <div className={styles.userDataHeader}>
              <h4>
                {user.name.firstname} {user.name.lastname}
              </h4>
              <div>
                <Button variant='outlined' color='error' onClick={logout}>
                  {t('logout')}
                </Button>
              </div>
            </div>
            <p>
              {t('email')}: {user.email}
            </p>
            <p>
              {t('city')}: {user.address.city} {user.address.zipcode}
            </p>
            <p>
              {t('address')}: {user.address.street} {user.address.number}
            </p>
            <p>
              {t('phone')}: {user.phone}
            </p>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default Profile;
