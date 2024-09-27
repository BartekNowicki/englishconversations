import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';
import LearnablesTable from './LearnablesTable';

interface PhrasesProps {
  learnables: any[];
  loading: boolean;
  error: string | null;
}

const Phrases: React.FC<PhrasesProps> = ({ learnables, loading, error }) => {
  if (loading) {
    return (
      <Box textAlign="center" mt={2}>
        <CircularProgress />
      </Box>
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
      <Typography variant="h6" align="center" sx={{ color: '#fff' }}>
        No phrases found.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: '40px'}}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fff' }}>
        Phrases
      </Typography>
      <LearnablesTable token={localStorage.getItem('token') || ''} />
    </Box>
  );
};

export default Phrases;
