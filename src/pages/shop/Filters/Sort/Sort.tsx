import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";

const Sort = forwardRef((props: any, ref: any) => {
  useImperativeHandle(ref, () => {
    return {
      resetSort() {
        setSortBy("");
      },
    };
  });

  const [sortBy, setSortBy] = useState<string>("");
  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
    props.onSortChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">{t("sort")}</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={sortBy}
        label={t("sort")}
        onChange={handleChange}
      >
        <MenuItem value={"titleAsc"}>{t("titleAscending")}</MenuItem>
        <MenuItem value={"titleDesc"}>{t("titleDescending")}</MenuItem>
        <MenuItem value={"priceAsc"}>{t("priceAscending")}</MenuItem>
        <MenuItem value={"priceDesc"}>{t("priceDescending")}</MenuItem>
      </Select>
    </FormControl>
  );
});

export default Sort;
