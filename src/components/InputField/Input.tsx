import TextField from '@mui/material/TextField';
import styles from './styles.module.css';

const Input = ({
  label,
  error = false,
  name = '',
  onChange,
  type,
  value,
  errorMessage = 'Incorrect entry.'
}: {
  label: string;
  error: boolean;
  name?: string;
  onChange: (e: any) => void;
  type: string;
  value: string;
  errorMessage?: string;
}) => {
  const isError = error ? error : false;

  return (
    <TextField
      error={isError}
      id={`outlined-error-helper-text_${label}`}
      type={type}
      label={label}
      helperText={isError && errorMessage}
      className={
        label !== 'Search' ? styles.marginBottom30 : styles.marginBottom0
      }
      onChange={onChange}
      fullWidth
      defaultValue={value}
      name={name}
    />
  );
};

export default Input;
