import React, { useReducer } from 'react'
import { Grid, Typography, Paper, Box } from '@mui/material'
import { createShortUrl } from '../../api'
import UrlInputField from './LinkInputField'
import NamedUrlField from './NamedLinkField'
import MaxVisitsField from './MaxVisitsField'
import ShortenButton from './ShortenButton'
import ShortUrlDisplay from './ShortLinkDisplay'
import ExpiryField from './expiryField'

interface LinkFormData {
  original_url: string
  expires_in?: number
  named_url?: string
  max_visits?: number
}

interface LinkFormProps {
  fetchUrls: () => Promise<void>
  showSnackbar: (message: string, severity: 'success' | 'error') => void
}

type FormState = {
  originalUrl: string
  expiresIn: string
  namedUrl: string
  maxVisits: string
  shortUrl: string
  isUrlValid: boolean
  isFormValid: boolean
}

type FormAction =
  | { type: 'SET_ORIGINAL_URL'; payload: string }
  | { type: 'SET_EXPIRES_IN'; payload: string }
  | { type: 'SET_NAMED_URL'; payload: string }
  | { type: 'SET_MAX_VISITS'; payload: string }
  | { type: 'SET_SHORT_URL'; payload: string }
  | { type: 'RESET_FORM' }

const initialState: FormState = {
  originalUrl: '',
  expiresIn: '',
  namedUrl: '',
  maxVisits: '',
  shortUrl: '',
  isUrlValid: true,
  isFormValid: false,
}

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_ORIGINAL_URL':
      const isValid = isValidUrl(action.payload)
      return {
        ...state,
        originalUrl: action.payload,
        isUrlValid: isValid,
        isFormValid: isValid && action.payload !== '',
      }
    case 'SET_EXPIRES_IN':
      return {
        ...state,
        expiresIn: action.payload,
      }
    case 'SET_NAMED_URL':
      return {
        ...state,
        namedUrl: action.payload,
      }
    case 'SET_MAX_VISITS':
      return {
        ...state,
        maxVisits: action.payload,
      }
    case 'SET_SHORT_URL':
      return {
        ...state,
        shortUrl: action.payload,
      }
    case 'RESET_FORM':
      return initialState
    default:
      return state
  }
}

// Validation function moved here for easier access by child components
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch (_) {
    return false
  }
}

function LinkForm({ fetchUrls, showSnackbar }: LinkFormProps) {
  const [state, dispatch] = useReducer(formReducer, initialState)

  const handleCreateShortUrl = async () => {
    if (!state.isFormValid) {
      showSnackbar('Please enter a valid URL', 'error')
      return
    }

    try {
      const urlData: LinkFormData = {
        original_url: state.originalUrl,
        expires_in: state.expiresIn ? parseInt(state.expiresIn) : undefined,
        named_url: state.namedUrl,
        max_visits: state.maxVisits ? parseInt(state.maxVisits) : undefined,
      }
      const newUrl = await createShortUrl(urlData)

      dispatch({
        type: 'SET_SHORT_URL',
        payload: `${window.location.origin}/go/${newUrl.short_code}`,
      })
      dispatch({ type: 'RESET_FORM' })

      fetchUrls()
      showSnackbar('Short URL created successfully!', 'success')
    } catch (error) {
      console.error('Error creating short URL:', error)
      showSnackbar('Error creating short URL', 'error')
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: '16px' }}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12}>
          <UrlInputField
            value={state.originalUrl}
            isValid={state.isUrlValid}
            onChange={(value) =>
              dispatch({ type: 'SET_ORIGINAL_URL', payload: value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ExpiryField
            value={state.expiresIn}
            onChange={(value) =>
              dispatch({ type: 'SET_EXPIRES_IN', payload: value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <NamedUrlField
            value={state.namedUrl}
            onChange={(value) =>
              dispatch({ type: 'SET_NAMED_URL', payload: value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MaxVisitsField
            value={state.maxVisits}
            onChange={(value) =>
              dispatch({ type: 'SET_MAX_VISITS', payload: value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <ShortenButton
            onClick={handleCreateShortUrl}
            disabled={!state.isFormValid}
          />
        </Grid>
      </Grid>

      <ShortUrlDisplay shortUrl={state.shortUrl} />
    </Paper>
  )
}

export default LinkForm
