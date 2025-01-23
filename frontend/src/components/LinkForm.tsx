import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { createShortUrl } from '../api';

interface LinkFormData {
  original_url: string;
  expires_in?: number;
  named_url?: string;
  max_visits?: number;
}

interface LinkFormProps {
  fetchUrls: () => Promise<void>;
  showSnackbar: (message: string, severity: 'success' | 'error') => void;
}

function LinkForm({ fetchUrls, showSnackbar }: LinkFormProps) {
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [expiresIn, setExpiresIn] = useState<string>('');
  const [namedUrl, setNamedUrl] = useState<string>('');
  const [maxVisits, setMaxVisits] = useState<string>('');

  const handleCreateShortUrl = async () => {
    try {
      const urlData: LinkFormData = {
        original_url: originalUrl,
        expires_in: expiresIn ? parseInt(expiresIn) : undefined,
        named_url: namedUrl,
        max_visits: maxVisits ? parseInt(maxVisits) : undefined,
      };
      const newUrl = await createShortUrl(urlData);
      setShortUrl(`${window.location.origin}/go/${newUrl.short_code}`);
      setOriginalUrl('');
      setExpiresIn('');
      setNamedUrl('');
      setMaxVisits('');
      fetchUrls();
      showSnackbar('Short URL created successfully!', 'success');
    } catch (error) {
      console.error('Error creating short URL:', error);
      showSnackbar('Error creating short URL', 'error');
    }
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Enter URL to shorten"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label="Expires In (seconds)"
            type="number"
            value={expiresIn}
            onChange={(e) => setExpiresIn(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="contained" onClick={handleCreateShortUrl}>
            Shorten
          </Button>
        </Grid>
      </Grid>

      {shortUrl && (
        <Typography variant="body1" style={{ marginTop: 10 }}>
          Short URL:{' '}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </Typography>
      )}
    </>
  );
}

export default LinkForm;