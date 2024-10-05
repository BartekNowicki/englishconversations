import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface UnscramblePracticeSessionProps {
  conversation: {
    conversation: { speaker: string; text: string }[];
    definitions: string[];
  };
}

const UnscramblePracticeSession: React.FC<UnscramblePracticeSessionProps> = ({ conversation }) => {
  const navigate = useNavigate();
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [definition, setDefinition] = useState<string>(conversation.definitions[0] || '');
  const [message, setMessage] = useState<string | null>(null);
  const phrase = conversation.conversation[0]?.text || ''; // Load first phrase to practice

  // Shuffle function moved above its use
  const shuffle = (array: string[]) => array.sort(() => Math.random() - 0.5);

  // Shuffle words for practice session
  useEffect(() => {
    const words = phrase.split(' ');
    setScrambledWords(shuffle(words));
  }, [phrase]);

  const handleWordSelect = (word: string) => {
    if (!selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word]);
      setScrambledWords(scrambledWords.filter((w) => w !== word));
    }
  };

  const handleRemoveSelectedWord = (word: string) => {
    setSelectedWords(selectedWords.filter((w) => w !== word));
    setScrambledWords([...scrambledWords, word]);
  };

  const handleCheckAnswer = () => {
    const userAnswer = selectedWords.join(' ');
    if (userAnswer === phrase) {
      setMessage('Success! You unscrambled the phrase correctly.');
    } else {
      setMessage(`Failure. The correct phrase is: "${phrase}"`);
    }
  };

  const handleEndSession = () => {
    navigate('/practice/unscramble'); // Navigate back to conversation selection
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        padding: '20px',
        backgroundColor: '#141414',
        boxSizing: 'border-box',
      }}
    >
      {/* Definition */}
      <Typography variant="h5" sx={{ color: '#fff', marginBottom: '20px' }}>
        {definition}
      </Typography>

      {/* Selected words */}
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
          width: '100%',
        }}
      >
        {selectedWords.map((word, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => handleRemoveSelectedWord(word)}
            sx={{ color: 'white', borderColor: 'white' }}
          >
            {word}
          </Button>
        ))}
        {Array.from({ length: scrambledWords.length }).map((_, index) => (
          <Button
            key={index}
            variant="outlined"
            disabled
            sx={{ color: 'gray', borderColor: 'gray' }}
          >
            ____
          </Button>
        ))}
      </Box>

      {/* Pool of scrambled words */}
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '20px',
          width: '100%',
        }}
      >
        {scrambledWords.map((word, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => handleWordSelect(word)}
            sx={{ color: 'black', backgroundColor: 'white' }}
          >
            {word}
          </Button>
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={handleCheckAnswer}
        sx={{ backgroundColor: '#fff', color: '#000', marginBottom: '20px' }}
        disabled={selectedWords.length !== phrase.split(' ').length}
      >
        Check Answer
      </Button>

      {/* Message Display */}
      {message && (
        <Typography variant="h6" sx={{ color: message.startsWith('Success') ? 'green' : 'red', marginTop: '20px' }}>
          {message}
        </Typography>
      )}

      {/* End Session Button */}
      <Button
        variant="contained"
        onClick={handleEndSession}
        sx={{ backgroundColor: 'red', color: '#fff', marginTop: '30px' }}
      >
        End Session
      </Button>
    </Box>
  );
};

export default UnscramblePracticeSession;
