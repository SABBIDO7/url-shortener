import React from 'react'
import { TextField } from '@mui/material'

interface ExpiryFieldProps {
  value: string
  onChange: (value: string) => void
}

function ExpiryField({ value, onChange }: ExpiryFieldProps) {
  return (
    <TextField
      fullWidth
      label='Expires In (seconds)'
      type='number'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant='outlined'
    />
  )
}

export default ExpiryField
