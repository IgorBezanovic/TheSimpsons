import Button from "@mui/material/Button";
import { userType } from "common/types/User.type";
import { AppLayout } from "components/Layouts";
import { userId } from "context/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "services/user.service";
import styles from "./styles.module.css";

const Profile = () => {
  const [user, setUser] = useState<userType>();
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const id = userId();

    const res = await userService.userProfile(id);

    console.log(res.data);
    return setUser(res.data);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    navigate("/");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AppLayout>
      <div className={styles.userProfile}>
        <img
          className={styles.profileImage}
          alt="ProfileImage"
          src="https://st4.depositphotos.com/1012074/25277/v/600/depositphotos_252773324-stock-illustration-young-avatar-face-with-sunglasses.jpg"
        ></img>
        <div className={styles.userData}>
          <div className={styles.userDataHeader}>
            <h4>
              {user?.name.firstname} {user?.name.lastname}
            </h4>
            <div>
              <Button variant="outlined" style={{ marginRight: "1em" }}>
                Edit
              </Button>
              <Button variant="outlined" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
          <p>Email: {user?.email}</p>
          <p>
            City: {user?.address.city} {user?.address.zipcode}
          </p>
          <p>
            Address: {user?.address.street} {user?.address.number}
          </p>
          <p>Phone: {user?.phone}</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
