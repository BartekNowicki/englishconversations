import React, { useState } from 'react';
import { Box, Typography, Button, FormControl, Select, MenuItem } from '@mui/material';

// const prepositions = [
//   'about', 'above', 'across', 'after', 'against', 'along', 'among', 'around', 'at',
//   'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'by',
//   'concerning', 'despite', 'down', 'during', 'except', 'for', 'from', 'in', 'inside',
//   'into', 'like', 'near', 'of', 'off', 'on', 'onto', 'out', 'outside', 'over', 'past',
//   'regarding', 'since', 'through', 'throughout', 'to', 'toward', 'under', 'underneath',
//   'until', 'up', 'upon', 'with', 'within', 'without', 'as', 'via'
// ];

// Define specific preposition sets for each sentence
const prepositionsSet1 = ['in', 'on', 'at', 'by'];
const prepositionsSet2 = ['in', 'on', 'during', 'for'];
const prepositionsSet3 = ['with', 'without', 'over', 'by'];

// Define correct answers for comparison
const originalPrepositions = ['in', 'on', 'with'];

const PrepositionPractice = () => {
  const [selectedPrepositions, setSelectedPrepositions] = useState<string[]>(Array(3).fill(''));
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [incorrectPrepositions, setIncorrectPrepositions] = useState<number[]>([]); // Track incorrect indices
  const [correctPrepositions, setCorrectPrepositions] = useState<number[]>([]); // Track correct indices

  const handlePrepositionChange = (index: number, value: string) => {
    const updatedSelections = [...selectedPrepositions];
    updatedSelections[index] = value;
    setSelectedPrepositions(updatedSelections);
  };

  const checkAnswers = () => {
    let correct = 0;
    const incorrectIndices: number[] = [];
    const correctIndices: number[] = [];

    selectedPrepositions.forEach((prep, index) => {
      if (prep === originalPrepositions[index]) {
        correct++;
        correctIndices.push(index);
      } else {
        incorrectIndices.push(index);
      }
    });

    setScore(correct);
    setIncorrectPrepositions(incorrectIndices); // Store incorrect indices
    setCorrectPrepositions(correctIndices); // Store correct indices
    setShowResult(true);
  };

  return (
    <Box
      sx={{
        padding: '40px', // Increased padding for the container
        backgroundColor: '#141414',
        color: 'white',
        borderRadius: '10px',
        width: '100%',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Updated title with larger font size */}
      <Typography
        variant="h5"
        sx={{
          fontSize: '2rem', // Increased font size for title
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        Select the correct prepositions to complete the sentences:
      </Typography>

      <Typography
        variant="body1"
        sx={{
          width: '100%',
          lineHeight: 1.8,
          textAlign: 'justify',
          marginBottom: '20px',
        }}
      >
        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
          1. The meeting will take place{' '}
          <FormControl
            sx={{
              minWidth: 80,
              marginLeft: '10px',
              marginRight: '10px',
              borderColor: incorrectPrepositions.includes(0)
                ? 'red'
                : correctPrepositions.includes(0)
                ? 'green'
                : 'transparent',
              borderWidth: incorrectPrepositions.includes(0) || correctPrepositions.includes(0) ? '2px' : '0px',
              borderStyle: 'solid',
              borderRadius: '5px',
            }}
          >
            <Select
              value={selectedPrepositions[0]}
              onChange={(e) => handlePrepositionChange(0, e.target.value as string)}
              sx={{
                color: 'white',
                backgroundColor: 'black',
                '& .MuiSelect-icon': { color: 'white' },
                fontSize: 'inherit',
              }}
            >
              {prepositionsSet1.map((prep, index) => (
                <MenuItem
                  key={index}
                  value={prep}
                  sx={{
                    color: 'white',
                    backgroundColor: 'black',
                    '&.Mui-selected': {
                      color: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0)',
                    },
                  }}
                >
                  {prep}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{' '}
          the conference room.
        </Box>
        <br />
        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
          2. He will be arriving{' '}
          <FormControl
            sx={{
              minWidth: 80,
              marginLeft: '10px',
              marginRight: '10px',
              borderColor: incorrectPrepositions.includes(1)
                ? 'red'
                : correctPrepositions.includes(1)
                ? 'green'
                : 'transparent',
              borderWidth: incorrectPrepositions.includes(1) || correctPrepositions.includes(1) ? '2px' : '0px',
              borderStyle: 'solid',
              borderRadius: '5px',
            }}
          >
            <Select
              value={selectedPrepositions[1]}
              onChange={(e) => handlePrepositionChange(1, e.target.value as string)}
              sx={{
                color: 'white',
                backgroundColor: 'black',
                '& .MuiSelect-icon': { color: 'white' },
                fontSize: 'inherit',
              }}
            >
              {prepositionsSet2.map((prep, index) => (
                <MenuItem
                  key={index}
                  value={prep}
                  sx={{
                    color: 'white',
                    backgroundColor: 'black',
                    '&.Mui-selected': {
                      color: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0)',
                    },
                  }}
                >
                  {prep}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{' '}
          the morning.
        </Box>
        <br />
        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
          3. She completed the task{' '}
          <FormControl
            sx={{
              minWidth: 80,
              marginLeft: '10px',
              marginRight: '10px',
              borderColor: incorrectPrepositions.includes(2)
                ? 'red'
                : correctPrepositions.includes(2)
                ? 'green'
                : 'transparent',
              borderWidth: incorrectPrepositions.includes(2) || correctPrepositions.includes(2) ? '2px' : '0px',
              borderStyle: 'solid',
              borderRadius: '5px',
            }}
          >
            <Select
              value={selectedPrepositions[2]}
              onChange={(e) => handlePrepositionChange(2, e.target.value as string)}
              sx={{
                color: 'white',
                backgroundColor: 'black',
                '& .MuiSelect-icon': { color: 'white' },
                fontSize: 'inherit',
              }}
            >
              {prepositionsSet3.map((prep, index) => (
                <MenuItem
                  key={index}
                  value={prep}
                  sx={{
                    color: 'white',
                    backgroundColor: 'black',
                    '&.Mui-selected': {
                      color: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0)',
                    },
                  }}
                >
                  {prep}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{' '}
          with ease.
        </Box>
      </Typography>

      <Button
        variant="contained"
        color="success"
        onClick={checkAnswers}
        sx={{ marginTop: '20px' }}
      >
        Check Answers
      </Button>

      {showResult && (
        <Typography
          variant="h6"
          sx={{
            marginTop: '20px',
            color: score === originalPrepositions.length ? 'green' : 'red',
          }}
        >
          You got {score} out of {originalPrepositions.length} correct!
        </Typography>
      )}
    </Box>
  );
};

export default PrepositionPractice;
