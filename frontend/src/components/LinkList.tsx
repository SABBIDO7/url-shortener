import React from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Link, 
  Typography 
} from '@mui/material'

function LinkList({ links }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Generated Short Links
      </Typography>
      {links.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No links generated yet.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Original URL</TableCell>
                <TableCell>Short Link</TableCell>
                <TableCell align="right">Clicks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {links.map((link) => (
                <TableRow key={link.id}>
                  <TableCell>
                    <Link 
                      href={link.original_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {link.original_url}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link 
                      href={`http://localhost:8000/go/${link.short_code}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {`http://localhost:8000/go/${link.short_code}`}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{link.clicks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default LinkList