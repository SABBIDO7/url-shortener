import React from 'react';
import { ListItem, ListItemText, Button } from '@mui/material';
import { deleteUrl } from '../api';
import { Url } from '../types'; // Import the type

interface LinkListItemProps {
  url: Url;
  fetchUrls: () => Promise<void>;
  showSnackbar: (message: string, severity: 'success' | 'error') => void;
}

function LinkListItem({ url, fetchUrls, showSnackbar }: LinkListItemProps) {
  const handleDelete = async () => {
    try {
      await deleteUrl(url.short_code);
      fetchUrls();
      showSnackbar('URL deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting URL:', error);
      showSnackbar('Error deleting URL', 'error');
    }
  };

  return (
    <ListItem>
      <ListItemText
        primary={`${window.location.origin}/go/${url.short_code}`}
        secondary={`Original: ${url.original_url}, Visits: ${url.visits}`}
      />
      <Button onClick={handleDelete}>Delete</Button>
    </ListItem>
  );
}

export default LinkListItem;