import React from 'react'
import { Snackbar, Alert } from '@mui/material'

interface SnackbarAlertProps {
  open: boolean
  message: string
  severity: 'success' | 'error'
  onClose: (event: React.SyntheticEvent | Event, reason?: string) => void
}

function SnackbarAlert({
  open,
  message,
  severity,
  onClose,
}: SnackbarAlertProps) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarAlert
