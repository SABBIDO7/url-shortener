import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { getAllUrls } from '../api';
import LinkForm from './LinkForm';
import LinkList from './LinkList';
import SnackbarAlert from './SnackbarAlert';
import { Url } from '../types'; // Import the type

function Home() {
  const [allUrls, setAllUrls] = useState<Url[]>([]); // Type the state
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'error'
  >('success');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const urls = await getAllUrls();
      setAllUrls(urls);
    } catch (error) {
      console.error('Error fetching URLs:', error);
      showSnackbar('Error fetching URLs', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        URL Shortener
      </Typography>

      <LinkForm fetchUrls={fetchUrls} showSnackbar={showSnackbar} />
      <LinkList
        allUrls={allUrls}
        fetchUrls={fetchUrls}
        showSnackbar={showSnackbar}
      />

      <SnackbarAlert
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
}

export default Home;