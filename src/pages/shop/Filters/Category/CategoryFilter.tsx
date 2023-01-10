/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import productServices from 'services/product.services';

const CategoryFilter = forwardRef((props: any, ref: any) => {
  useImperativeHandle(ref, () => {
    return {
      resetCategory() {
        setCategory('');
      }
    };
  });

  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('');

  const { t } = useTranslation();

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const onCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    props.onCategoryChange(event.target.value as string);
  };

  const fetchAllCategories = async () => {
    try {
      const res = await productServices.getProductGroups();
      setAllCategories(res.data);
    } catch (error) {
      toast.info(t('unableToFetchGroups'));
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id='category-select-label'>{t('category')}</InputLabel>
      <Select
        labelId='category-select-label'
        id='category-select'
        value={category}
        label={t('category')}
        onChange={onCategoryChange}
      >
        {allCategories &&
          allCategories.map(category => (
            <MenuItem key={category} value={category}>
              {t(category)}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
});

export default CategoryFilter;
