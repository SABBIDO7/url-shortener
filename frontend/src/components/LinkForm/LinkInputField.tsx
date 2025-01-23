import React from 'react';
import { TextField } from '@mui/material';

interface LinkInputFieldProps {
  value: string;
  isValid: boolean;
  onChange: (value: string) => void;
}

function LinkInputField({ value, isValid, onChange }: LinkInputFieldProps) {
  return (
    <TextField
      fullWidth
      label="Enter URL to shorten"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={!isValid && value !== ''}
      helperText={!isValid && value !== '' ? 'Invalid URL format' : ''}
      variant="outlined"
    />
  );
}

export default LinkInputField;