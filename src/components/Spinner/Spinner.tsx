import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingContext from 'context/loading/loading.context';
import { useContext } from 'react';

const Spinner = () => {
  const loadingCtx = useContext(LoadingContext);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
      open={loadingCtx.isOpen}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};

export default Spinner;
