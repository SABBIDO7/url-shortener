import React from 'react'
import { TextField } from '@mui/material'

interface NamedLinkFieldProps {
  value: string
  onChange: (value: string) => void
}

function NamedLinkField({ value, onChange }: NamedLinkFieldProps) {
  return (
    <TextField
      fullWidth
      label='Named URL (optional)'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant='outlined'
    />
  )
}

export default NamedLinkField
