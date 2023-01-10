import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import { Product } from 'common/types/Product.type';
import { LocalizedPrice } from 'languages/LocalizedPrice';
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({ props, t }: { props: Product; t: any }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ maxWidth: 345 }}
      className='custom-product-card flex-direction-product-card'
    >
      <div>
        <CardMedia
          component='img'
          alt={props.title}
          height='140'
          image={props.image}
          onClick={() => navigate(`/product/${props.id}`)}
        />
        <CardContent className='product-info-wrapper flex-direction-product-card'>
          <Typography gutterBottom variant='subtitle1' component='div'>
            {props.title.length > 45
              ? props.title.slice(0, 45) + '...'
              : props.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            <LocalizedPrice price={props.price}></LocalizedPrice>
          </Typography>
        </CardContent>
      </div>
      <CardActions style={{ justifyContent: 'flex-end' }}>
        <Button size='small' onClick={() => navigate(`/product/${props.id}`)}>
          {t('viewProduct')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
