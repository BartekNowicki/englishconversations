import { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { increaseRetention } from '../utils/increaseRetention';
import { Learnable } from '../types';
import { ClickableDistractor } from './PhraseQuestPractice';

interface PhraseQuestPracticeSessionProps {
  token: string;
  clickables: string[];
  clickableDistractors: ClickableDistractor[];
  userLearnables: Learnable[];
}

const INITIAL_MESSAGE = 'do you know the correct phrase?'

const PhraseQuestPracticeSession: React.FC<PhraseQuestPracticeSessionProps> = ({ token, clickables, clickableDistractors, userLearnables }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string | null>(INITIAL_MESSAGE);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();

  const colors = [
      'rgba(255, 99, 71, 0.7)',  // Light Red
      'rgba(60, 179, 113, 0.7)', // Light Green
      'rgba(100, 149, 237, 0.7)',// Light Blue
      'rgba(210, 105, 30, 0.7)'  // Light Brown
    ];

  // Shuffle options at the start of each question
  useEffect(() => {
    shuffleOptions();
  }, [currentIndex]);

  const shuffleOptions = () => {
    const correctPhrase = clickables[currentIndex];
    const distractors = clickableDistractors.find(d => d.phrase === correctPhrase)?.distractors || [];
    const options = [correctPhrase, ...distractors].sort(() => Math.random() - 0.5); // Shuffle the correct phrase and distractors
    setShuffledOptions(options);
  };

  const handleOptionSelect = async (selectedOption: string) => {
    setSelectedOption(selectedOption);
    const correctPhrase = clickables[currentIndex];
    if (selectedOption === correctPhrase) {
      setIsCorrect(true);
      setMessage(`Right on!  The correct phrase is "${correctPhrase}"`);

            // Find the corresponding learnable in userLearnables
            try {
              const foundLearnable = userLearnables.find(l => l.phrase === correctPhrase);

              if (foundLearnable && foundLearnable.id) {
                // If the correct phrase is found in `userLearnables`, make the API call to increase retention
                await increaseRetention(foundLearnable.id, token);
                console.log(`Retention increased for learnable with ID: ${foundLearnable.id}`);
              } else {
                //console.log(`Learnable ${correctPhrase} not found in the userLearnables. Skipping retention increase.`);
              }
            } catch (error) {
              console.error("Error increasing retention:", error);
            }

          } else {
            setIsCorrect(false);
            setMessage('Incorrect! Try again.');
          }
        };

  const handleNext = () => {
    if (currentIndex < clickables.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsCorrect(null);
      setMessage('do you know the correct phrase?');
      shuffleOptions();
    } else {
      setMessage('You have completed all phrases!');
    }
  };

  const handleEndSession = () => {
    navigate('/practice/phrasequest/');
    window.location.reload(); // Force page reload after navigation
  };

  const getMessageColor = () => isCorrect === null ? 'gray' : isCorrect === true ? 'green' : 'red';

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
      {/* Instruction in gray and higher */}
      <Typography
        variant="subtitle2"
        sx={{
          color: 'gray',
          fontSize: '18px',
          marginBottom: '10px',
          textAlign: 'center',
          position: 'relative',
          top: '-20px',
        }}
      >
        Find the correct phrase for:
      </Typography>

      {/* Definition in white underneath */}
      <Typography
        variant="h5"
        sx={{
          color: '#fff',
          textAlign: 'center',
          fontSize: '24px',
          marginBottom: '100px',
        }}
      >
        {clickableDistractors[currentIndex]?.definition || 'No definition available'}
      </Typography>

      {/* Display the options (correct and distractors) */}
     <Box
       sx={{
         display: 'grid',
         gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns
         gap: '20px',
         marginBottom: '20px',
       }}
     >
       {shuffledOptions.map((option, index) => (
         <Button
           key={index}
           disabled={isCorrect === true}
           onClick={() => handleOptionSelect(option)}
           sx={{
             width: '300px',
             height: '50px',
             color: '#fff',
             textTransform: 'none', // Prevent text capitalization
             backgroundColor: colors[index % colors.length],
             border: selectedOption === option
               ? `6px solid ${isCorrect ? 'green' : 'red'}` // Thicker border with correct/incorrect color
               : '2px solid transparent', // Thin transparent border for unselected buttons
             transition: 'border 0.3s ease', // Smooth border transition
           }}
         >
           {option}
         </Button>
       ))}
     </Box>

      {/* Display feedback message */}
      <Typography variant="h5" sx={{ color: getMessageColor(), marginBottom: '100px', marginTop: '50px' }}>
        {message}
      </Typography>

      {/* Navigation buttons */}
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Button variant="contained" onClick={handleNext} disabled={currentIndex >= clickables.length}>
          Next
        </Button>

        <Button variant="contained" onClick={handleEndSession} sx={{ backgroundColor: '#ff4d4d', color: '#fff' }}>
          End Session
        </Button>
      </Box>

      {/* Display phrase count */}
      <Box sx={{ position: 'absolute', bottom: '20px', textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: 'gray' }}>
          {currentIndex + 1} / {clickables.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default PhraseQuestPracticeSession;
