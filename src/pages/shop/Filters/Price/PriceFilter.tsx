import { Chip, Slider } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

const PriceFilter = (props: any) => {
  const [minMaxPrices, setMinMaxPrices] = useState<number[]>([1, 1000]);
  const [min, setMin] = useState<number>();
  const [max, setMax] = useState<number>();

  useEffect(() => {
    setMinMaxPrices(props.minMax);
    setMin(props.minMax[0]);
    setMax(props.minMax[1]);
  }, [props.minMax]);

  const onPriceChange = (event: Event, newValue: number | number[]) => {
    setMinMaxPrices(newValue as number[]);
  };

  const onApplyFilterPrice = () => {
    props.onApplyFilterPrice(minMaxPrices);
  };

  return (
    <Box>
      <Slider
        value={minMaxPrices}
        onChange={onPriceChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
      />
      <Chip label="Apply filter price" onClick={onApplyFilterPrice} />
    </Box>
  );
};

export default PriceFilter;
