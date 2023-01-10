import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { lightBlue, red } from '@mui/material/colors';
import { UserDTO } from 'common/types/Login.type';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import Input from 'components/InputField';
import LoadingContext from 'context/loading/loading.context';
import UserContext from 'context/user/user.context';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './styles.module.css';

const Login = () => {
  const userCtx = useContext(UserContext);
  const loadingCtx = useContext(LoadingContext);

  const [isError, setIsError] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loginUserDTO, setLoginUserDTO] = useState<UserDTO>({
    username: '',
    password: ''
  });

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogin = async (event: any) => {
    event.preventDefault();

    if (!loginUserDTO.username)
      return [console.log('Username is empty'), setIsError(true)];
    if (!loginUserDTO.password)
      return [console.log('Password is empty'), setIsError(true)];

    loadingCtx.show();

    try {
      await userCtx.onLogin(loginUserDTO);
      navigate('/');
    } catch (error) {
      toast.error(t('badCredentials'), {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: 'light'
      });
    }

    loadingCtx.hide();
  };

  const handlePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleUserData = (name: string, value: string) => {
    setLoginUserDTO({ ...loginUserDTO, [name]: value });
  };

  return (
    <div className={styles.loadingWrapper}>
      <Headline title={t('login')} />
      <div className={styles.displayWrapper}>
        <Input
          label={t('username')}
          type='text'
          error={!loginUserDTO.username && isError}
          onChange={(e: React.BaseSyntheticEvent<Event>) =>
            handleUserData('username', e.target.value)
          }
          value={loginUserDTO.username}
        />
        <div className={styles.passwordWrapper}>
          <Input
            label={t('password')}
            type={isVisible ? 'text' : 'password'}
            error={!loginUserDTO.password && isError}
            onChange={(e: React.BaseSyntheticEvent<Event>) =>
              handleUserData('password', e.target.value)
            }
            value={loginUserDTO.password}
          />
          <div className={styles.visibilityWrapper}>
            {isVisible ? (
              <VisibilityIcon
                onClick={handlePasswordVisibility}
                className={styles.visibilityIcon}
                style={{ color: red[900] }}
              />
            ) : (
              <VisibilityOffIcon
                onClick={handlePasswordVisibility}
                className={styles.visibilityIcon}
                style={{ color: lightBlue[900] }}
              />
            )}
          </div>
        </div>
        <Button variant='outlined' onClick={handleLogin}>
          {t('submit')}
        </Button>
        <p className={styles.userData}>
          {t('testUser')} <br />
          <em>
            <strong>{t('username')}: </strong>johnd
            <br />
            <strong>{t('password')}: </strong>m38rmF$
          </em>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
