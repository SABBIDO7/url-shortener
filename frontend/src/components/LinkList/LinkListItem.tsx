import React from 'react'
import {
  ListItem,
  ListItemText,
  Button,
  Divider,
  ListItemButton,
  IconButton,
} from '@mui/material'
import { deleteUrl, updateUrl } from '../../api'
import { Url } from '../../types'
import EditLinkDialog from './EditLinkDialog'
import { ContentCopy } from '@mui/icons-material'

interface LinkListItemProps {
  url: Url
  fetchUrls: () => Promise<void>
  showSnackbar: (message: string, severity: 'success' | 'error') => void
}

function LinkListItem({ url, fetchUrls, showSnackbar }: LinkListItemProps) {
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)

  const handleDelete = async () => {
    try {
      await deleteUrl(url.id)
      fetchUrls()
      showSnackbar('URL deleted successfully!', 'success')
    } catch (error) {
      console.error('Error deleting URL:', error)
      showSnackbar('Error deleting URL', 'error')
    }
  }
  const handleOpenEditDialog = () => {
    setEditDialogOpen(true)
  }

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false)
  }
  const handleUpdateUrl = async (updatedUrl: Url) => {
    try {
      await updateUrl(url.id, updatedUrl)
      fetchUrls()
      showSnackbar('URL updated successfully!', 'success')
    } catch (error) {
      console.error('Error updating URL:', error)
      showSnackbar('Error updating URL', 'error')
    }
  }
  const openLink = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    window.open(`${window.location.origin}/go/${url.short_code}`, '_blank')
  }
  const handleCopyLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const link = `${window.location.origin}/go/${url.short_code}`
    navigator.clipboard
      .writeText(link)
      .then(() => {
        showSnackbar('Link copied to clipboard!', 'success')
      })
      .catch(() => {
        showSnackbar('Failed to copy the link.', 'error')
      })
  }

  return (
    <>
      <ListItem
        component={ListItemButton}
        onDoubleClick={openLink}
        sx={{
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        <ListItemText
          primary={
            url.named_url
              ? `${window.location.origin}/go/${url.short_code} (${url.named_url})`
              : `${window.location.origin}/go/${url.short_code}`
          }
          secondary={`Original: ${url.original_url}, Visits: ${url.visits}`}
          sx={{
            pr: 2,
            '& .MuiListItemText-primary': {
              fontWeight: 'bold',
              color: 'primary.main',
            },
          }}
        />
        <IconButton
          aria-label='Copy link'
          onClick={handleCopyLink}
          sx={{ ml: 1 }}
        >
          <ContentCopy fontSize='small' />
        </IconButton>
        <Button
          variant='outlined'
          onClick={(event) => {
            event.stopPropagation()
            handleOpenEditDialog()
          }}
          sx={{ ml: 1 }}
        >
          Edit
        </Button>
        <Button
          variant='outlined'
          color='error'
          onClick={(event) => {
            event.stopPropagation()
            handleDelete()
          }}
          sx={{ ml: 1 }}
        >
          Delete
        </Button>
      </ListItem>
      <EditLinkDialog
        open={editDialogOpen}
        url={url}
        onClose={handleCloseEditDialog}
        onUpdate={handleUpdateUrl}
      />
      <Divider />
    </>
  )
}

export default LinkListItem
