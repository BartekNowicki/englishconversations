import { useState } from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { Learnable } from '../types';

interface FlashCardPracticeProps {
  learnables: Learnable[];
  loading: boolean;
  error: string | null;
}

const FlashCardPractice: React.FC<FlashCardPracticeProps> = ({ learnables, loading, error }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  if (loading) {
    return (
      <Box textAlign="center" mt={2}>
        <Typography>Loading...</Typography>
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
        No flashcards found.
      </Typography>
    );
  }

  const handleToggleSide = () => {
    setShowTranslation((prev) => !prev);
  };

  const handleNext = () => {
    setCurrentCardIndex((prev) => (prev + 1) % learnables.length);
    setShowTranslation(false);
  };

  const handlePrevious = () => {
    setCurrentCardIndex((prev) => (prev - 1 + learnables.length) % learnables.length);
    setShowTranslation(false);
  };

  const currentCard = learnables[currentCardIndex];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '40px',
        width: '100%',
        backgroundColor: '#141414',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 600,
          height: 200,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#282828',
          color: '#fff',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
          marginBottom: '20px',
        }}
      >
        <CardContent>
          <Typography variant="h5" textAlign="center">
            {showTranslation ? currentCard.translation : currentCard.phrase}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <Button
          onClick={handlePrevious}
          sx={{ color: 'white', minWidth: '120px' }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleToggleSide}
          sx={{ minWidth: '180px' }}
        >
          {showTranslation ? 'Show Phrase' : 'Show Translation'}
        </Button>
        <Button
          onClick={handleNext}
          sx={{ color: 'white', minWidth: '120px' }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default FlashCardPractice;
