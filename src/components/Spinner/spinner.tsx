import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext } from "react";
import LoadingContext from "context/loading/loading.context";

const Spinner = () => {
  const loadingCtx = useContext(LoadingContext);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingCtx.isOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Spinner;
