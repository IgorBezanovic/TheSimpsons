const convertPrice = (WrappedComponent: any) => {
  return function ConvertedPrice({ price }: { price: number }) {
    const lang = localStorage.getItem('i18nextLng');

    let newPrice: string;

    if (lang === 'en') {
      newPrice = `$${price}`;
    } else {
      newPrice = `${(price * 100).toFixed(2)} RSD`;
    }

    return <WrappedComponent price={newPrice}></WrappedComponent>;
  };
};

const DisplayPrice = ({ price }: { price: number }) => {
  return <span>{price}</span>;
};

export const LocalizedPrice = convertPrice(DisplayPrice);
