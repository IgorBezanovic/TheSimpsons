import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Search = forwardRef((props: any, ref: any) => {
  const [search, setSearch] = useState<string>('');
  const { t } = useTranslation();

  useImperativeHandle(ref, () => {
    return {
      resetSearch() {
        setSearch('');
        props.onSearchChange('');
      }
    };
  });

  const onSearchChange = (event: any) => {
    setSearch(event.target.value);
    props.onSearchChange(event.target.value);
  };

  return (
    <TextField
      fullWidth
      id='outlined-basic'
      label={t('search')}
      value={search}
      variant='outlined'
      onChange={onSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        )
      }}
    />
  );
});

export default Search;
