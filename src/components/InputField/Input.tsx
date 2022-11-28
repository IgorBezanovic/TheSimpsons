import React from 'react';
import TextField from '@mui/material/TextField';
import styles from "./styles.module.css";

const Input = ({ label, error = false, onChange, type }: { label: string, error: boolean, onChange: (e: any) => void, type: string }) => {
  const isError = error ? error : false;

  return (
    <TextField
      error={isError}
      id={`outlined-error-helper-text_${label}`}
      type={type}
      label={label}
      helperText={isError && 'Incorrect entry.'}
      className={styles.marginBottom30}
      onChange={onChange}
      fullWidth
    />
  )
}

export default Input;