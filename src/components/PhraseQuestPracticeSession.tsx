import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

const PhraseQuestPracticeSession: React.FC = ({ learnables, learnableDistractors }) => {

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141414',
        width: '100%',
      }}
    >
      <h1>Phrase Quest Practice Session</h1>
      <ul>
        {learnables && learnables.map((clickable, index) => (
          <li key={index}>{clickable}</li>
        ))}
      </ul>
    </Box>
  );
};

export default PhraseQuestPracticeSession;
