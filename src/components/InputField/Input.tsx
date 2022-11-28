import React from 'react';
import TextField from '@mui/material/TextField';


const Input = ({ label, error = false }: {label: string, error: boolean}) => {
  const isError = error ? error : false;

  return (
    <TextField
      error={isError}
      id="outlined-error-helper-text"
      label={label}
      helperText={isError ? 'Incorrect entry.' : ''}
    />
  )
}

export default Input;