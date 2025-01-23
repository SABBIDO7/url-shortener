import React from 'react'
import { ListItem, ListItemText, Button } from '@mui/material'
import { deleteUrl, updateUrl } from '../api'
import { Url } from '../types' // Import the type
import EditLinkDialog from './EditLinkDialog'

interface LinkListItemProps {
  url: Url
  fetchUrls: () => Promise<void>
  showSnackbar: (message: string, severity: 'success' | 'error') => void
}

function LinkListItem({ url, fetchUrls, showSnackbar }: LinkListItemProps) {
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)

  const handleDelete = async () => {
    try {
      await deleteUrl(url.short_code)
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
      await updateUrl(url.short_code, updatedUrl)
      fetchUrls()
      showSnackbar('URL updated successfully!', 'success')
    } catch (error) {
      console.error('Error updating URL:', error)
      showSnackbar('Error updating URL', 'error')
    }
  }

  return (
    <ListItem>
      <ListItemText
        primary={`${window.location.origin}/go/${url.short_code}`}
        secondary={`Original: ${url.original_url}, Visits: ${url.visits}`}
      />
      <Button onClick={handleOpenEditDialog}>Edit</Button>

      <Button onClick={handleDelete}>Delete</Button>
      <EditLinkDialog
        open={editDialogOpen}
        url={url}
        onClose={handleCloseEditDialog}
        onUpdate={handleUpdateUrl}
      />
    </ListItem>
  )
}

export default LinkListItem
