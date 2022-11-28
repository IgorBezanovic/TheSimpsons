import React from 'react';
import TextField from '@mui/material/TextField';
import styles from "./styles.module.css";

const Input = ({ label, error = false, onChange }: { label: string, error: boolean, onChange: (e: any) => void }) => {
  const isError = error ? error : false;

  return (
    <TextField
      error={isError}
      id={`outlined-error-helper-text_${label}`}
      type={label === 'Password' ? 'password' : 'text'}
      label={label}
      helperText={isError && 'Incorrect entry.'}
      className={styles.marginBottom30}
      onChange={onChange}
    />
  )
}

export default Input;