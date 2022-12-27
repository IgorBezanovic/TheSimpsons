import { Button, Grid } from "@mui/material";
import { productType } from "common/types/Product.type";
import { AppLayout } from "components/Layouts";
import ProductCard from "components/ProductCard";
import LoadingContext from "context/loading/loading.context";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import productServices from "services/product.services";
import CategoryFilter from "./Filters/Category/CategoryFilter";
import PriceFilter from "./Filters/Price/PriceFilter";
import Search from "./Filters/Search";
import Sort from "./Filters/Sort";
import styles from "./styles.module.css";

const Shop = () => {
  const [productsByCategory, setProductsByCategory] = useState<productType[]>(
    []
  );
  const [filteredProducts, setFilteredProducts] = useState<productType[]>([]);

  const [minMaxPricesFromCategory, setMinMaxPricesFromCategory] = useState<
    [number, number]
  >([0, 0]);
  const [minMaxPrices, setMinMaxPrices] = useState<[number, number]>([0, 0]);
  const [search, setSearch] = useState<string>("");

  const loadingCtx = useContext(LoadingContext);
  const { t } = useTranslation();

  const categoryRef = useRef() as any;
  const searchRef = useRef() as any;
  const sortRef = useRef() as any;

  useEffect(() => {
    fetchAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onFilterChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minMaxPrices, search]);

  const fetchAllProducts = async () => {
    try {
      loadingCtx.show();
      const products = await productServices.getAllProducts();
      setProductsByCategory(products.data);
      setFilteredProducts(products.data);
      calcMinMaxPrices(products.data);
      loadingCtx.hide();
    } catch (error) {
      toast.info(t("unableToFetchProducts"));
      loadingCtx.hide();
    }
  };

  const fetchProductsByCategory = async (category: string) => {
    try {
      loadingCtx.show();
      const products = await productServices.getProductFromGroup(category);
      setProductsByCategory(products.data);
      setFilteredProducts(products.data);
      calcMinMaxPrices(products.data);
      loadingCtx.hide();
    } catch (error) {
      toast.info(t("unableToFetchProducts"));
      loadingCtx.hide();
    }
  };

  const calcMinMaxPrices = (products: productType[]) => {
    const prices = products.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    setMinMaxPricesFromCategory([min, max]);
    setMinMaxPrices([min, max]);
  };

  const onFilterChange = () => {
    const min = minMaxPrices[0];
    const max = minMaxPrices[1];

    const productMatches = productsByCategory.filter((product) => {
      const priceMatch = product.price >= min && product.price <= max;

      const searchMatch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return searchMatch && priceMatch;
    });

    setFilteredProducts(productMatches);
  };

  const resetFilters = async () => {
    await fetchAllProducts();
    categoryRef.current.resetCategory();
    searchRef.current.resetSearch();
    sortRef.current.resetSort();
  };

  const onCategoryChange = (category: string) => {
    fetchProductsByCategory(category);
  };

  const onPriceChange = (minMaxPrices: [number, number]) => {
    setMinMaxPrices(minMaxPrices);
  };

  const onSearchChange = (search: string) => {
    setSearch(search);
  };

  const onSortChange = (sortBy: string) => {
    if (sortBy === "titleAsc") {
      setFilteredProducts([
        ...filteredProducts.sort((a, b) => (a.title > b.title ? 1 : -1)),
      ]);
    } else if (sortBy === "titleDesc") {
      setFilteredProducts([
        ...filteredProducts.sort((a, b) => (a.title < b.title ? 1 : -1)),
      ]);
    } else if (sortBy === "priceAsc") {
      setFilteredProducts([
        ...filteredProducts.sort((a, b) => a.price - b.price),
      ]);
    } else if (sortBy === "priceDesc") {
      setFilteredProducts([
        ...filteredProducts.sort((a, b) => b.price - a.price),
      ]);
    } else {
      setFilteredProducts([...filteredProducts.sort((a, b) => a.id - b.id)]);
    }
  };

  return (
    <AppLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} lg={2}>
          <div className={styles.filterItem}>
            <CategoryFilter
              className={styles.filterItem}
              onCategoryChange={onCategoryChange}
              ref={categoryRef}
            />
          </div>

          <hr style={{ marginBottom: "2em" }} />

          <div className={styles.filterItem}>
            <PriceFilter
              minMax={minMaxPricesFromCategory}
              onApplyFilterPrice={onPriceChange}
            />
          </div>

          <hr style={{ marginBottom: "2em" }} />

          <div className={styles.filterItem}>
            <Search onSearchChange={onSearchChange} ref={searchRef} />
          </div>

          <hr style={{ marginBottom: "2em" }} />

          <div className={styles.filterItem}>
            <Button variant="outlined" fullWidth onClick={resetFilters}>
              {t("resetFilters")}
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <Grid container justifyContent={"end"} sx={{ marginBottom: "2em" }}>
            <Grid item xs={12} md={3}>
              <Sort onSortChange={onSortChange} ref={sortRef} />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {filteredProducts?.length ? (
              filteredProducts.map((product) => (
                <Grid item xs={6} md={4} lg={3} key={product.id}>
                  <ProductCard key={product.id} props={product} t={t} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <h2>{t("noProducts")}</h2>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </AppLayout>
  );
};

export default Shop;
