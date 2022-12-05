import React, { useState } from "react";
import { AppLayout } from "components/Layouts";
import Headline from "components/Headline";
import Input from "components/InputField";
import { userType } from "common/types/User.type";

const Checkout = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<userType>({
    name: {
      firstname: "",
      lastname: "",
    },
    address: {
      city: "",
      street: "",
      number: 0,
      zipcode: "",
    },
  });

  const handleUserData = (name: string, value: string) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <AppLayout>
      <Headline title="Checkout" />
      <h2>Biling details:</h2>
      <Input
        label="Name"
        type="text"
        error={!userInfo.name?.firstname && isError}
        onChange={(e: any) => handleUserData("username", e.target.value)}
        value={userInfo.name?.firstname ?? ""}
      />
      <Input
        label="Last name"
        type="text"
        error={!userInfo.name?.lastname && isError}
        onChange={(e: any) => handleUserData("username", e.target.value)}
        value={userInfo.name?.lastname ?? ""}
      />
    </AppLayout>
  );
};

export default Checkout;
