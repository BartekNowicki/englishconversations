import { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { loadConversationById } from '../utils/loadConversation';

const UnscramblePracticeSession = () => {
  const { id } = useParams<{ id: string }>();
  const [clickables, setClickables] = useState<string[]>([]);
  const [definitions, setDefinitions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadClickables = async () => {
      try {
        if (id) {
          const { clickables, definitions } = await loadConversationById(id);
          setClickables(clickables);
          setDefinitions(definitions);
          setScrambledWords(shuffle(clickables[0].split(' ')));
        }
      } catch (error) {
        console.error('Failed to load conversation:', error);
      }
    };

    loadClickables();
  }, [id]);

  const shuffle = (array: string[]) => array.sort(() => Math.random() - 0.5);

  const handleWordSelect = (word: string) => {
    if (!selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word]);
      setScrambledWords(scrambledWords.filter((w) => w !== word));
    }
    setIsCorrect(null);
    setMessage(null);
  };

  const handleRemoveSelectedWord = (word: string) => {
    setSelectedWords(selectedWords.filter((w) => w !== word));
    setScrambledWords([...scrambledWords, word]);
    setIsCorrect(null);
    setMessage(null);
  };

  const handleCheckAnswer = () => {
    const userAnswer = selectedWords.join(' ');
    if (userAnswer === clickables[currentIndex]) {
      setMessage('Correct! You unscrambled the phrase.');
      setIsCorrect(true);
    } else {
      setMessage('');
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < clickables.length) {
      setCurrentIndex(nextIndex);
      setScrambledWords(shuffle(clickables[nextIndex].split(' ')));
      setSelectedWords([]);
      setIsCorrect(null);
      setMessage(null);
    } else {
      setMessage('You have completed all phrases!');
    }
  };

  const handleEndSession = () => {
    setCurrentIndex(0);
    setSelectedWords([]);
    setScrambledWords([]);
    setMessage(null);
    setIsCorrect(null);
    navigate('/practice/unscramble');
  };

  const boxHeight = '50px';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141414',
        padding: '20px',
      }}
    >
      {id && clickables.length > 0 ? (
        <>
          <Box sx={{ height: boxHeight, marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ color: '#fff', textAlign: 'center' }}>
              {definitions[currentIndex]}
            </Typography>
          </Box>

          <Box
            sx={{
              height: boxHeight,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '20px',
              width: '100%',
              paddingBottom: '20px',
            }}
          >
            {selectedWords.length > 0 ? (
              selectedWords.map((word, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => handleRemoveSelectedWord(word)}
                  sx={{
                    color: 'white',
                    borderColor: isCorrect === true ? 'green' : isCorrect === false ? 'red' : 'white',
                  }}
                >
                  {word}
                </Button>
              ))
            ) : (
              <Typography sx={{ color: '#999' }}>Click the words to form the phrase</Typography>
            )}
          </Box>

          <Box
            sx={{
              height: boxHeight,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '20px',
              visibility: isCorrect === false ? 'visible' : 'hidden',
            }}
          >
            <Typography variant="h6" sx={{ color: 'yellow', textAlign: 'center' }}>
              {clickables[currentIndex]}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '20px',
            }}
          >
          <Box
            key={"positioningBox"}
            sx={{
              display: 'inline-block', // Ensures it's inlined
              color: 'green',
              backgroundColor: 'transparent',
              padding: '6px 16px',
              borderRadius: '4px',
              border: '1px solid green',
              textAlign: 'center',
            }}
          >
            {"available words:"}
          </Box>
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

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Button
              variant="contained"
              onClick={handleCheckAnswer}
              sx={{
                backgroundColor: selectedWords.length === clickables[currentIndex].split(' ').length ? 'white' : 'gray',
                color: selectedWords.length === clickables[currentIndex].split(' ').length ? 'black' : 'white',
              }}
              disabled={selectedWords.length !== clickables[currentIndex].split(' ').length}
            >
              Check Your Answer
            </Button>

            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ backgroundColor: '#00e676', color: '#000' }}
              disabled={currentIndex >= clickables.length}
            >
              Next
            </Button>

            <Button
              variant="contained"
              onClick={handleEndSession}
              sx={{ backgroundColor: '#ff4d4d', color: '#fff', marginTop: '10px' }}
            >
              End Session
            </Button>
          </Box>

          <Box sx={{ height: boxHeight, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Typography
              variant="h6"
              sx={{
                color: isCorrect ? 'green' : 'red',
                visibility: message ? 'visible' : 'hidden',
              }}
            >
              {message}
            </Typography>
          </Box>
        </>
      ) : (
        <Typography sx={{ color: '#fff' }}>No conversation selected.</Typography>
      )}
    </Box>
  );
};

export default UnscramblePracticeSession;
