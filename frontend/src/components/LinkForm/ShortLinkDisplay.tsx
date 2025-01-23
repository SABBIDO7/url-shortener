import React from 'react'
import { Typography, Link } from '@mui/material'

interface ShortUrlDisplayProps {
  shortUrl: string
}

function ShortUrlDisplay({ shortUrl }: ShortUrlDisplayProps) {
  if (!shortUrl) return null

  return (
    <Typography variant='body1' style={{ marginTop: 10 }}>
      Short URL:{' '}
      <Link href={shortUrl} target='_blank' rel='noopener noreferrer'>
        {shortUrl}
      </Link>
    </Typography>
  )
}

export default ShortUrlDisplay
