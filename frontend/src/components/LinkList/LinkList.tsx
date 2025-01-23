import React from 'react'
import { List, Paper, Typography } from '@mui/material'
import LinkListItem from './LinkListItem'
import { Url } from '../types' // Import the type

interface LinkListProps {
  allUrls: Url[]
  fetchUrls: () => Promise<void>
  showSnackbar: (message: string, severity: 'success' | 'error') => void
}

function LinkList({ allUrls, fetchUrls, showSnackbar }: LinkListProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        mt: 3,
        borderRadius: '16px',
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      <Typography
        variant='h6'
        sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}
      >
        Existing Short URLs:
      </Typography>
      <List sx={{ maxHeight: 300, overflow: 'auto' }}>
        {Array.isArray(allUrls) && allUrls.length > 0 ? (
          allUrls.map((url) => (
            <LinkListItem
              key={url.short_code}
              url={url}
              fetchUrls={fetchUrls}
              showSnackbar={showSnackbar}
            />
          ))
        ) : (
          <Typography sx={{ p: 2, color: 'text.secondary' }}>
            No short URLs yet.
          </Typography>
        )}
      </List>
    </Paper>
  )
}

export default LinkList
