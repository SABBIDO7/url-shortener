import React from 'react';
import { List } from '@mui/material';
import LinkListItem from './LinkListItem';
import { Url } from '../types'; // Import the type

interface LinkListProps {
  allUrls: Url[];
  fetchUrls: () => Promise<void>;
  showSnackbar: (message: string, severity: 'success' | 'error') => void;
}

function LinkList({ allUrls, fetchUrls, showSnackbar }: LinkListProps) {
  return (
    <>
      {Array.isArray(allUrls) && allUrls.length > 0 && (
        <List>
          {allUrls.map((url) => (
            <LinkListItem
              key={url.short_code}
              url={url}
              fetchUrls={fetchUrls}
              showSnackbar={showSnackbar}
            />
          ))}
        </List>
      )}
    </>
  );
}

export default LinkList;