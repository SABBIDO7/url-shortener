import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import { getAllUrls } from '../api'
import LinkForm from './LinkForm/LinkForm'
import LinkList from '../components/LinkList/LinkList'
import SnackbarAlert from './SnackbarAlert'
import { Url } from '../types' // Import the type
import { Link as LinkIcon } from '@mui/icons-material' // Import an icon

function Home() {
  const [allUrls, setAllUrls] = useState<Url[]>([]) // Type the state
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  )

  useEffect(() => {
    fetchUrls()
  }, [])

  const fetchUrls = async () => {
    try {
      const urls = await getAllUrls()
      setAllUrls(urls)
    } catch (error) {
      console.error('Error fetching URLs:', error)
      showSnackbar('Error fetching URLs', 'error')
    }
  }

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  return (
    <Container maxWidth='md'>
      {/* App Bar Header */}
      <AppBar position='static' color='default' elevation={1} sx={{ mb: 4 }}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <LinkIcon fontSize='large' color='primary' />
          </IconButton>
          <Typography
            variant='h4'
            component='div'
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              color: 'primary.main',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
            }}
          >
            URL Shortener
          </Typography>
        </Toolbar>
      </AppBar>
      <Box mt={4}>
        <LinkForm fetchUrls={fetchUrls} showSnackbar={showSnackbar} />
      </Box>
      <Box mt={4}>
        <LinkList
          allUrls={allUrls}
          fetchUrls={fetchUrls}
          showSnackbar={showSnackbar}
        />
      </Box>

      <SnackbarAlert
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Container>
  )
}

export default Home
