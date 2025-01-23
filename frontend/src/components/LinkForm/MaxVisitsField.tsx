import React from 'react';
import { TextField } from '@mui/material';

interface MaxVisitsFieldProps {
  value: string;
  onChange: (value: string) => void;
}

function MaxVisitsField({ value, onChange }: MaxVisitsFieldProps) {
  return (
    <TextField
      fullWidth
      label="Max Visits (optional)"
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
    />
  );
}

export default MaxVisitsField;