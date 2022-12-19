import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { userType } from "common/types/User.type";
import { AppLayout } from "components/Layouts";
import userService from "services/user.service";
import styles from "./styles.module.css";
import AuthContext from "context/user/auth.context";
import LoadingContext from "context/loading/loading.context";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const loadingCtx = useContext(LoadingContext);

  const { t } = useTranslation();

  const [user, setUser] = useState<userType>();

  const fetchUserData = async (id: number) => {
    try {
      loadingCtx.show();
      const res = await userService.userProfile(id);

      setUser(res.data);
      loadingCtx.hide();
    } catch (error) {
      loadingCtx.hide();
      toast.info(t("unableToFetchUser"));
    }
  };

  const logout = () => {
    authCtx.onLogout();
  };

  useEffect(() => {
    fetchUserData(authCtx.id);
    // eslint-disable-next-line
  }, []);

  return (
    <AppLayout>
      {user ? (
        <div className={styles.userProfile}>
          <img
            className={styles.profileImage}
            alt="ProfileImage"
            src="https://st4.depositphotos.com/1012074/25277/v/600/depositphotos_252773324-stock-illustration-young-avatar-face-with-sunglasses.jpg"
          ></img>
          <div className={styles.userData}>
            <div className={styles.userDataHeader}>
              <h4>
                {user.name.firstname} {user.name.lastname}
              </h4>
              <div>
                <Button variant="outlined" color="error" onClick={logout}>
                  {t("logout")}
                </Button>
              </div>
            </div>
            <p>
              {t("email")}: {user.email}
            </p>
            <p>
              {t("city")}: {user.address.city} {user.address.zipcode}
            </p>
            <p>
              {t("address")}: {user.address.street} {user.address.number}
            </p>
            <p>
              {t("phone")}: {user.phone}
            </p>
          </div>
        </div>
      ) : (
        <p>{t("loading")}</p>
      )}
    </AppLayout>
  );
};

export default Profile;
