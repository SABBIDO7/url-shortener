import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Redirect() {
  const { short_code } = useParams()

  useEffect(() => {
    window.location.href = `/api/go/${short_code}`
  }, [short_code])

  return <div>Redirecting...</div>
}

export default Redirect
