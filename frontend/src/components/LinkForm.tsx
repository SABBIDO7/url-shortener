import React, { useState, useEffect, useReducer } from 'react'
import { TextField, Button, Grid, Typography } from '@mui/material'
import { createShortUrl } from '../api'

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

// Validation function (using a regular expression)
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch (_) {
    return false
  }
}

// State management with useReducer
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
    <>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label='Enter URL to shorten'
            value={state.originalUrl}
            onChange={(e) =>
              dispatch({ type: 'SET_ORIGINAL_URL', payload: e.target.value })
            }
            error={!state.isUrlValid && state.originalUrl !== ''}
            helperText={
              !state.isUrlValid && state.originalUrl !== ''
                ? 'Invalid URL format'
                : ''
            }
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label='Expires In (seconds)'
            type='number'
            value={state.expiresIn}
            onChange={(e) =>
              dispatch({ type: 'SET_EXPIRES_IN', payload: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            variant='contained'
            onClick={handleCreateShortUrl}
            disabled={!state.isFormValid}
          >
            Shorten
          </Button>
        </Grid>
      </Grid>

      {state.shortUrl && (
        <Typography variant='body1' style={{ marginTop: 10 }}>
          Short URL:{' '}
          <a href={state.shortUrl} target='_blank' rel='noopener noreferrer'>
            {state.shortUrl}
          </a>
        </Typography>
      )}
    </>
  )
}

export default LinkForm
