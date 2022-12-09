import { useContext, useEffect, useState } from "react";
import { AppLayout } from "components/Layouts";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LoadingContext from "context/loading/loading.context";
import { toast } from "react-toastify";
import productServices from "services/product.services";
import { productType } from "common/types/Product.type";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import ProductCard from "components/ProductCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const loadingCtx = useContext(LoadingContext);

  const [productGroups, setProductGroups] = useState<[string]>();
  const [products, setProducts] = useState<[productType]>();
  const [category, setCategory] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const fetchGroupNames = async () => {
    try {
      loadingCtx.show();
      const res = await productServices.getProductGroups();

      setProductGroups(res.data);
      console.log(res.data);
      loadingCtx.hide();
    } catch (error) {
      loadingCtx.hide();
      toast.info("Unable to fetch product groups");
    }
  };

  const fetchProducts = async () => {
    try {
      loadingCtx.show();
      const res = await productServices.getAllProducts();

      setProducts(res.data);
      console.log(res.data);
      loadingCtx.hide();
    } catch (error) {
      loadingCtx.hide();
      toast.info("Unable to fetch products");
    }
  };

  useEffect(() => {
    fetchGroupNames();
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <AppLayout>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3} md={2}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={9} md={10}>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                label="Category"
                onChange={handleChange}
              >
                {productGroups &&
                  productGroups.map((product) => (
                    <MenuItem key={product} value={product}>
                      {product}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={2}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={9} md={10}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                {products &&
                  products.map((product, index) => (
                    <Grid item xs={6} md={3} key={index}>
                      <ProductCard key={product.id} props={product} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </AppLayout>
  );
};

export default Home;
