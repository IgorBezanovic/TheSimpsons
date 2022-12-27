import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import LoadingContext from "context/loading/loading.context";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import productServices from "services/product.services";

const CategoryFilter = forwardRef((props: any, ref: any) => {
  useImperativeHandle(ref, () => {
    return {
      resetCategory() {
        setCategory("");
      },
    };
  });

  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");

  const { t } = useTranslation();
  const loadingCtx = useContext(LoadingContext);

  useEffect(() => {
    fetchAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    props.onCategoryChange(event.target.value as string);
  };

  const fetchAllCategories = async () => {
    try {
      loadingCtx.show();
      const res = await productServices.getProductGroups();
      setAllCategories(res.data);
      loadingCtx.hide();
    } catch (error) {
      loadingCtx.hide();
      toast.info(t("unableToFetchGroups"));
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="category-select-label">{t("category")}</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={category}
        label={t("category")}
        onChange={onCategoryChange}
      >
        {allCategories &&
          allCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {t(category)}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
});

export default CategoryFilter;
