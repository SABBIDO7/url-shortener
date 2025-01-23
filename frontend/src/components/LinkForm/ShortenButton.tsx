import React from 'react'
import { Button } from '@mui/material'

interface ShortenButtonProps {
  onClick: () => void
  disabled: boolean
}

function ShortenButton({ onClick, disabled }: ShortenButtonProps) {
  return (
    <Button
      variant='contained'
      color='primary'
      onClick={onClick}
      disabled={disabled}
      fullWidth
    >
      Shorten
    </Button>
  )
}

export default ShortenButton
