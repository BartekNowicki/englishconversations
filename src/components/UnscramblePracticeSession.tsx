import { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { increaseRetention } from '../utils/increaseRetention';
import { Learnable } from '../types';

interface UnscramblePracticeSessionProps {
  conversation: {
    clickables: string[];
    definitions: string[];
  };
  token: string;
  userLearnables: Learnable[];
}

const UnscramblePracticeSession: React.FC<UnscramblePracticeSessionProps> = ({ conversation, token, userLearnables }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    setScrambledWords(shuffle(conversation.clickables[currentIndex].split(' ')));
  }, [currentIndex, conversation]);

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

  const handleCheckAnswer = async () => {
    const userAnswer = selectedWords.join(' ');
    const correctAnswer = conversation.clickables[currentIndex];

    if (userAnswer === correctAnswer) {
      setMessage('Correct! You unscrambled the phrase.');
      setIsCorrect(true);

      try {
        const foundLearnable = userLearnables.find(l => l.phrase === correctAnswer);

        if (foundLearnable && foundLearnable.id) {
          // If the correct phrase is found in `learnables`, make the API call
          await increaseRetention(foundLearnable.id, token);
          console.log("Retention increased for learnable with ID:", foundLearnable.id);
        } else {
          console.log(`Learnable ${correctAnswer} not found in the fetched userLearnables. Skipping retention increase.`);
        }
      } catch (error) {
        console.error("Error increasing retention:", error);
      }
    } else {
      setIsCorrect(false); // Border will turn red
    }
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < conversation.clickables.length) {
      setCurrentIndex(nextIndex);
      setScrambledWords(shuffle(conversation.clickables[nextIndex].split(' ')));
      setSelectedWords([]);
      setIsCorrect(null);
      setMessage(null);
    } else {
      setMessage('You have completed all phrases!');
    }
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
        position: 'relative',
      }}
    >
      <Box sx={{ height: boxHeight, marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ color: '#fff', textAlign: 'center' }}>
          {conversation.definitions[currentIndex]}
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
          {conversation.clickables[currentIndex]}
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
            backgroundColor: selectedWords.length === conversation.clickables[currentIndex].split(' ').length ? 'white' : 'gray',
            color: selectedWords.length === conversation.clickables[currentIndex].split(' ').length ? 'black' : 'white',
            margin: '20px 0',
                '&.Mui-disabled': {
                  backgroundColor: '#141414',
                  color: '#141414',
                },
          }}
          disabled={selectedWords.length !== conversation.clickables[currentIndex].split(' ').length || isCorrect === true}
        >
          Check Your Answer
        </Button>

        <Button
          variant="contained"
          onClick={handleNext}
          sx={{ backgroundColor: '#00e676', color: '#000' }}
          disabled={currentIndex >= conversation.clickables.length}
        >
          Next
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            navigate('/practice/unscramble/');
            window.location.reload();  // Force page reload after navigation; needed for gh pages only
          }}
          sx={{ backgroundColor: '#ff4d4d', color: '#fff', marginTop: '10px' }}
        >
          End Session
        </Button>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ color: 'gray' }}>
          {currentIndex + 1} / {conversation.clickables.length}
        </Typography>
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
    </Box>
  );
};

export default UnscramblePracticeSession;
