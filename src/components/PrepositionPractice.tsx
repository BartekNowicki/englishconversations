import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { PrepositionSelect } from './PrepositionSelect';

// KEEP FOR REFERENCE
// const allPrepositions = [
//   'about', 'above', 'across', 'after', 'against', 'along', 'among', 'around', 'at',
//   'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'by',
//   'concerning', 'despite', 'down', 'during', 'except', 'for', 'from', 'in', 'inside',
//   'into', 'like', 'near', 'of', 'off', 'on', 'onto', 'out', 'outside', 'over', 'past',
//   'regarding', 'since', 'through', 'throughout', 'to', 'toward', 'under', 'underneath',
//   'until', 'up', 'upon', 'with', 'within', 'without', 'as', 'via'
// ];

// Define correct prepositions for each sentence
const originalPrepositions = [
  'at',       // Sentence 1
  'at',       // Sentence 2
  'on',       // Sentence 3
  'on',       // Sentence 4
  'in',       // Sentence 5
  'on',       // Sentence 6
  'to',       // Sentence 7
  'to',       // Sentence 8
  'at',       // Sentence 9
  'of',       // Sentence 10
  'the',      // Sentence 11
  'for',      // Sentence 12
  'to',       // Sentence 13
  'to',       // Sentence 14
  'to',       // Sentence 15
  'at',       // Sentence 16
  'home',     // Sentence 17
  'me',       // Sentence 18
  'on',       // Sentence 19
  'a',        // Sentence 20
  'to',       // Sentence 21
  'with',     // Sentence 22
  'of',       // Sentence 23
  'in',       // Sentence 24
  'in',       // Sentence 25
  'with',     // Sentence 26
  'to',       // Sentence 27
  'in',       // Sentence 28
  'in',       // Sentence 29
  'on',       // Sentence 30
  'at'        // Sentence 31
];

const sentences = [
  "I'm waiting", "She arrived", "I'll meet you", "He depends", "She is interested", "I was born", "We’re going",
  "Can you explain this", "I’m good", "She’s afraid", "Let’s discuss", "I’m responsible", "He’s married",
  "I’m looking forward", "She listens", "They arrived", "I'm going", "Please write", "I live", "This book is",
  "She apologized for being late", "He’s angry", "They are proud", "The train leaves", "She will return",
  "I agree", "He is addicted", "I’m going to the gym", "She works", "They congratulated me", "I am"
];

const sentenceEndings = [
  " the bus stop.", " the airport early.", " Monday.", " his parents.", " learning English.",
  " May 5th.", " a party tonight.", " me?", " math.", " spiders.", " project tomorrow.",
  " cleaning the room.", " her sister.", " the weekend.", " music all the time.",
  " Warsaw yesterday.", " now.", " an email.", " the first floor.", " love story.",
  " the meeting.", " her.", " their achievements.", " the afternoon.", " two weeks.",
  " your suggestion.", " video games.", " the evening.", " a bank.", " my success."," a meeting"
];

const wrongPrepositionsSet = [
  ['on', 'in', 'by'],  // sentence 1
  ['in', 'to', 'by'],  // sentence 2
  ['in', 'at', 'by'],  // sentence 3
  ['from', 'by', 'at'],  // sentence 4
  ['of', 'at', 'on'],  // sentence 5
  ['at', 'in', 'to'],  // sentence 6
  ['on', 'in', 'for'],  // sentence 7
  ['with', 'in', 'by'],  // sentence 8
  ['of', 'in', 'on'],  // sentence 9
  ['from', 'with', 'in'],  // sentence 10
  ['about the', 'in the', 'by the'],  // sentence 11
  ['about', 'by', 'to'],  // sentence 12
  ['with', 'in', 'by'],  // sentence 13
  ['for', 'toward', 'towards'],  // sentence 14
  ['on', 'the', 'by'],  // sentence 15
  ['to', 'on', 'by'],  // sentence 16
  ['to home', 'for home', 'at'],  // sentence 17
  ['towards me', 'for me', 'at me'],  // sentence 18
  ['in', 'at', 'by'],  // sentence 19
  ['on a', 'in a', 'by a'],  // sentence 20
  ['by', 'over', 'on'],  // sentence 21
  ['on', 'by', 'in'],  // sentence 22
  ['about', 'in', 'by'],  // sentence 23
  ['from', 'on', 'at'],  // sentence 24
  ['to', 'for', 'on'],  // sentence 25
  ['by', 'on', 'for'],  // sentence 26
  ['on', 'of', 'from'],  // sentence 27
  ['on', 'from', 'by'],  // sentence 28
  ['via', 'from', 'by'],  // sentence 29
  ['in', 'with', 'by'],  // sentence 30
  ['on', 'with', 'to']  // sentence 31
];


const PrepositionPractice = () => {
  const [selectedPrepositions, setSelectedPrepositions] = useState<string[]>(Array(30).fill(''));
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
