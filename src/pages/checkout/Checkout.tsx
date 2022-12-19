import React, { useState } from "react";
import { AppLayout } from "components/Layouts";
import Input from "components/InputField";
import { useFormik } from "formik";
import { checkoutValidationSchema } from "common/validations/checkout-user";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Checkout = () => {
  const [errors, setErrors] = useState<any>();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: 0,
      firstname: "",
      lastname: "",
      city: "",
      street: "",
      number: 0,
      zipcode: 0,
    },
    validationSchema: checkoutValidationSchema,

    onSubmit: (values) => {
      formik.resetForm();
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(formik.errors);

    if (Object.keys(formik.errors).length === 0) {
      toast.success(t("orderSent"));
      navigate("/");
    }
  };

  return (
    <AppLayout>
      <div style={{ maxWidth: "400px", width: "90%", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "30px" }}>{t("billingDetails")}:</h2>
        <form onSubmit={handleLogin}>
          <Input
            label={t("firstName")}
            type="text"
            name="firstname"
            error={Boolean(errors && errors.firstname)}
            onChange={formik.handleChange}
            value={formik.values.firstname}
            errorMessage={errors && errors.firstname}
          />
          <Input
            label={t("lastName")}
            type="text"
            name="lastname"
            error={Boolean(errors && errors.lastname)}
            onChange={formik.handleChange}
            value={formik.values.lastname}
            errorMessage={errors && errors.lastname}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <Input
              label={t("address")}
              type="text"
              name="street"
              error={Boolean(errors && errors.street)}
              onChange={formik.handleChange}
              value={formik.values.street}
              errorMessage={errors && errors.street}
            />
            <Input
              label={t("houseNumber")}
              type="text"
              name="number"
              error={Boolean(errors && errors.number)}
              onChange={formik.handleChange}
              value={`${
                formik.values.number !== 0 ? formik.values.number : ""
              }`}
              errorMessage={errors && errors.number}
            />
          </div>
          <Input
            label={t("city")}
            type="text"
            name="city"
            error={Boolean(errors && errors.city)}
            onChange={formik.handleChange}
            value={formik.values.city}
            errorMessage={errors && errors.city}
          />
          <Input
            label={t("zipCode")}
            type="text"
            name="zipcode"
            error={Boolean(errors && errors.zipcode)}
            onChange={formik.handleChange}
            value={`${
              formik.values.zipcode !== 0 ? formik.values.zipcode : ""
            }`}
            errorMessage={errors && errors.zipcode}
          />
          <Input
            label={t("phone")}
            type="text"
            name="phone"
            error={Boolean(errors && errors.phone)}
            onChange={formik.handleChange}
            value={`${formik.values.phone !== 0 ? formik.values.phone : ""}`}
            errorMessage={errors && errors.phone}
          />
          <Input
            label={t("email")}
            type="text"
            name="email"
            error={Boolean(errors && errors.email)}
            onChange={formik.handleChange}
            value={formik.values.email}
            errorMessage={errors && errors.email}
          />
          <Button variant="outlined" type="submit">
            {t("submit")}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
};

export default Checkout;
