import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { PrepositionSelect } from './PrepositionSelect';

const originalPrepositions = [
  'at', 'at', 'on', 'on', 'in', 'on', 'to', 'to', 'at', 'of', 'the', 'for', 'to',
  'to', 'to', 'at', 'home', 'me', 'on', 'a', 'to', 'with', 'of', 'in', 'in',
  'with', 'to', 'in', 'in', 'on', 'at'
];

const sentences = [
  "I'm waiting", "She arrived", "I'll meet you", "He depends", "She is interested",
  "I was born", "We’re going", "Can you explain this", "I’m good", "She’s afraid",
  "Let’s discuss", "I’m responsible", "He’s married", "I’m looking forward",
  "She listens", "They arrived", "I'm going", "Please write", "I live", "This book is",
  "She apologized for being late", "He’s angry", "They are proud", "The train leaves",
  "She will return", "I agree", "He is addicted", "I’m going to the gym",
  "She works", "They congratulated me", "I am"
];

const sentenceEndings = [
  " the bus stop.", " the airport early.", " Monday.", " his parents.", " learning English.",
  " May 5th.", " a party tonight.", " me?", " math.", " spiders.", " project tomorrow.",
  " cleaning the room.", " her sister.", " the weekend.", " music all the time.",
  " Warsaw yesterday.", " now.", " an email.", " the first floor.", " love story.",
  " the meeting.", " her.", " their achievements.", " the afternoon.", " two weeks.",
  " your suggestion.", " video games.", " the evening.", " a bank.", " my success.", " a meeting"
];

const wrongPrepositionsSet = [
  ['on', 'in', 'by'], ['in', 'to', 'by'], ['in', 'at', 'by'], ['from', 'by', 'at'],
  ['of', 'at', 'on'], ['at', 'in', 'to'], ['on', 'in', 'for'], ['with', 'in', 'by'],
  ['of', 'in', 'on'], ['from', 'with', 'in'], ['about the', 'in the', 'by the'],
  ['about', 'by', 'to'], ['with', 'in', 'by'], ['for', 'toward', 'towards'],
  ['on', 'the', 'by'], ['to', 'on', 'by'], ['to home', 'for home', 'at'],
  ['towards me', 'for me', 'at me'], ['in', 'at', 'by'], ['on a', 'in a', 'by a'],
  ['by', 'over', 'on'], ['on', 'by', 'in'], ['about', 'in', 'by'], ['from', 'on', 'at'],
  ['to', 'for', 'on'], ['by', 'on', 'for'], ['on', 'of', 'from'], ['on', 'from', 'by'],
  ['via', 'from', 'by'], ['in', 'with', 'by'], ['on', 'with', 'to']
];

const PrepositionPractice = () => {
  const [selectedPrepositions, setSelectedPrepositions] = useState<string[]>(Array(31).fill(''));
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [incorrectPrepositions, setIncorrectPrepositions] = useState<number[]>([]);
  const [correctPrepositions, setCorrectPrepositions] = useState<number[]>([]);

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
    setIncorrectPrepositions(incorrectIndices);
    setCorrectPrepositions(correctIndices);
    setShowResult(true);
  };

  return (
    <Box
      sx={{
        padding: '40px',
        backgroundColor: '#141414',
        color: 'white',
        borderRadius: '10px',
        width: '100%',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '40px',
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
        {sentences.map((sentence, index) => (
          <Box key={index} sx={{ marginBottom: '15px', display: 'block' }}>
            <Typography
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                marginBottom: '5px',
                position: 'relative',
              }}
            >
              {index + 1}. {sentence}{' '}
              <PrepositionSelect
                value={selectedPrepositions[index]}
                onChange={(e) => handlePrepositionChange(index, e.target.value as string)}
                wrongPrepositions={wrongPrepositionsSet[index]}
                correctPreposition={originalPrepositions[index]}
                isCorrect={correctPrepositions.includes(index)}
                isIncorrect={incorrectPrepositions.includes(index)}
              />
              {sentenceEndings[index]}

              {/* Show correct answer in green circle if wrong */}
              {showResult && incorrectPrepositions.includes(index) && (
                <Box
                  sx={{
                    display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '10px',
                        padding: '15px',
                        backgroundColor: 'green',
                        borderRadius: '50%',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        minWidth: '30px',
                        height: '30px',
                  }}
                >
                  {originalPrepositions[index].toUpperCase()}
                </Box>
              )}
            </Typography>
          </Box>
        ))}
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
