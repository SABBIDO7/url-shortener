import React, { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'

function LinkForm({ onShortenUrl }) {
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (url.trim()) {
      onShortenUrl(url)
      setUrl('')
    }
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{ display: 'flex', mb: 2 }}
    >
      <TextField
        fullWidth
        variant='outlined'
        label='Enter URL to shorten'
        type='url'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ mr: 2 }}
        required
      />
      <Button type='submit' variant='contained' color='primary'>
        Shorten
      </Button>
    </Box>
  )
}

export default LinkForm
