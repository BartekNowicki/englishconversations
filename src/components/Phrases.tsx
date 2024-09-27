import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import LearnablesTable from './LearnablesTable'; // Import your MUI Table component

interface PhrasesProps {
  learnables: any[];
  loading: boolean;
  error: string | null;
}

const Phrases: React.FC<PhrasesProps> = ({ learnables, loading, error }) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (learnables.length === 0) {
    return (
      <Typography variant="h6" align="center">
        No phrases found.
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>

      </Typography>
      <LearnablesTable token={localStorage.getItem('token') || ''} />
    </div>
  );
};

export default Phrases;
