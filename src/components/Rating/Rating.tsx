import { Rating as RatingMui } from '@mui/material';

const Rating = (props: any) => {
  return (
    <RatingMui name='read-only' readOnly value={props.rating} precision={0.5} />
  );
};

export default Rating;
