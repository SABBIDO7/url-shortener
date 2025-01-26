import React from 'react'
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { Url } from '../../types'

interface EditLinkDialogProps {
  open: boolean
  url: Url | null
  onClose: () => void
  onUpdate: (updatedUrl: Url) => void
}

function EditLinkDialog({ open, url, onClose, onUpdate }: EditLinkDialogProps) {
  const [editUrlData, setEditUrlData] = React.useState<Url>({
    id: 0,
    short_code: '',
    original_url: '',
    created_at: '',
    named_url: '',
    visits: 0,
    expires_in: 0,
  })

  React.useEffect(() => {
    if (url) {
      setEditUrlData({
        ...url,
        expires_in: url.expires_at
          ? Math.round((new Date(url.expires_at).getTime() - Date.now()) / 1000)
          : null,
      })
    }
  }, [url])

  const handleInputChange = (
    field: keyof Url | 'expires_in',
    value: string | number | null
  ) => {
    setEditUrlData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  const handleUpdate = () => {
    onUpdate(editUrlData)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Url</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Original Url'
          type='Url'
          fullWidth
          value={editUrlData?.original_url}
          onChange={(e) => handleInputChange('original_url', e.target.value)}
        />
        <TextField
          margin='dense'
          label='Expires In (seconds)'
          type='number'
          fullWidth
          value={editUrlData?.expires_in || ''}
          onChange={(e) =>
            handleInputChange(
              'expires_in',
              e.target.value ? parseInt(e.target.value) : null
            )
          }
        />
        <TextField
          margin='dense'
          label='Named Url'
          type='text'
          fullWidth
          value={editUrlData?.named_url || ''}
          onChange={(e) => handleInputChange('named_url', e.target.value)}
        />
        <TextField
          margin='dense'
          label='Max Visits'
          type='number'
          fullWidth
          value={editUrlData?.max_visits || ''}
          onChange={(e) =>
            handleInputChange(
              'max_visits',
              e.target.value ? parseInt(e.target.value) : null
            )
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditLinkDialog
