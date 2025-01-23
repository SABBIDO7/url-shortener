import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LinkForm from './components/LinkForm'
import LinkList from './components/LinkList'

type Link = {
  id: string
  originalUrl: string
  shortUrl: string
}
function App() {
  const [links, setLinks] = useState<Link[]>([])
  const [error, setError] = useState<string | null>(null)

  const API_BASE_URL = 'http://localhost:8000'

  const fetchLinks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/urls`)
      setLinks(response.data)
    } catch (err) {
      setError('Failed to fetch links')
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  const handleShortenUrl = async (url) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/shorten`, { url })
      setLinks([...links, response.data])
      setError(null)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to shorten URL')
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>URL Shortener</h1>
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
      )}
      <LinkForm onShortenUrl={handleShortenUrl} />
      <LinkList links={links} />
    </div>
  )
}

export default App
